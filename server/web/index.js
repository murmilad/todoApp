
const express = require('express')
const bodyParser = require('body-parser')
const { exec } = require('child_process')
const sizeOf = require('image-size')

const PORT = process.env.PORT || 8000

const GALLERY_PATH = './gallery'
const RESUME_FOLDER = 'resume'
const RESUME_FILE = 'resume_test.txt'

var fs = require('fs');
var { parse } = require('csv-parse');

const { Client } = require('pg')
const client = new Client({
  user: 'postgres',
  host: '127.0.0.1',
  database: 'gallery',
  password: 'postgres',
  port: 5559,
})

var parser = parse({
  columns: true,
  delimiter: '|',
  quote :'`',
  columns: ['name', 'resume', 'ignored']
}, async function (err, records)  {
  if (err){
    console.error('Parsing file: '+GALLERY_PATH + '/' + RESUME_FOLDER + '/' + RESUME_FILE+' error:' + err);
    process.exit(1);
  }
  //console.log('records:' + JSON.stringify(records));

  await client.connect()

  //sync resume file
  await client.query(`
    WITH
      source_data AS (
        SELECT j->>'name' AS name,
              j->>'resume' AS resume,
              (CASE WHEN j->>'ignored' = '1' THEN true ELSE false END)::BOOLEAN AS ignored
        FROM JSON_ARRAY_ELEMENTS($1::JSON) j
      ),
      updated AS (
        UPDATE resume
        SET resume = s.resume,
            ignored = s.ignored
        FROM source_data s
        WHERE resume.name = s.name
        RETURNING resume.name
      )
    INSERT INTO resume
    SELECT name, resume, ignored
    FROM source_data s
    WHERE s.name NOT IN (SELECT name FROM updated);`,
    [JSON.stringify(records)]
  );
  
  const app = express()
  app.use(bodyParser.json())

  // Login

  // usernames are keys and passwords are values
  const users = {
    username: 'password',
  }

  app.post('/login', (req, res) => {
    const {username, password} = req.body

    if (!username || !password) return res.status(400).send('Missing username or password')
    // in practice, this is potentially revealing too much information.
    // an attacker can probe the server to find all of the usernames.
    if (!users[username]) return res.status(403).send('User does not exist')
    if (users[username] !== password) return res.status(403).send('Incorrect password')
    return res.json({token:'thisIsARealToken'})
  })

  app.get('/check', (req, res) =>  {

    return res.json({result:'ok'})
  })


  // Gallery

  app.get('/gallery',async (req, res) =>  {

    let resume = await db.get();

    let albumPath = GALLERY_PATH + '/' + RESUME_FOLDER
    let gallery = []
    fs.readdirSync(albumPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .sort().reverse()
      .forEach(main_folder => {

        let imageCount = 0;
        let signedImageCount = 0;
        let thumbnails = [];
        fs.readdirSync(albumPath + '/' + main_folder, { withFileTypes: true })
          .filter(dirent => dirent.isDirectory())
          .map(dirent => dirent.name)
          .forEach(folder => {

            fs.readdirSync(albumPath + '/' + main_folder + '/' + folder)
              .forEach( async file => {
                thumbnails.push(file)

                let foundResume  = resume.find((imageName) => imageName.name === file)
                if (foundResume && (foundResume.resume || foundResume.ignored)) signedImageCount++
                imageCount++
              })
          })

        let albumData = {}

        albumData.thumbnail_name = thumbnails
        albumData.name = main_folder
        albumData.header = main_folder.replace(/^\w+_/,'').replaceAll(/-/g,' ')
        albumData.imageCount = imageCount
        albumData.unsignedImageCount = imageCount - signedImageCount
        gallery.push(albumData)


      })

    return res.json(gallery)
  })


  // Album

  app.get('/album/:album', async (req, res) => {
    

    if (!req.params.album) return res.status(400).send('Missing album')

    
    let resume = await db.get();

    let albumPath = GALLERY_PATH + '/' + RESUME_FOLDER + '/' + req.params.album;
    let albumList = [];
    fs.readdirSync(albumPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .forEach(folder => {

        fs.readdirSync(albumPath + '/' + folder).forEach(file => {

          let imageData = {}
          let foundResume  = resume.find((imageName) => imageName.name === file)

          imageData.thumbnail_name = file
          imageData.name = file
          imageData.albumName = req.params.album
          imageData.imageName = file
          imageData.resume = foundResume ? foundResume.resume : undefined
          imageData.ignored = foundResume ? foundResume.ignored === "1" : undefined
          albumList.push(imageData)
        })
    })

    return res.json(albumList)
  })

  // Image

  app.get('/album/:album/image/:image',  (req, res) => {
    

    if (!req.params.album) return res.status(400).send('Missing album')
    if (!req.params.image) return res.status(400).send('Missing image')


    let albumPath = GALLERY_PATH + '/' + RESUME_FOLDER + '/' + req.params.album;

    let file = req.params.image
    let imageData = {}
    fs.readdirSync(albumPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .forEach(folder => {

        if (fs.existsSync(albumPath + '/' + folder + '/' + file)) {
          let bitmap = fs.readFileSync(albumPath + '/' + folder + '/' + file)
          let dimensions = sizeOf(albumPath + '/' + folder + '/' + file)

          imageData.thumbnail = Buffer.from(bitmap).toString('base64')
          imageData.width = dimensions.width
          imageData.height = dimensions.height
          imageData.name = file
        }
    })

    return res.json(imageData)
  })

  // Art

  app.get('/album/:album/art/:art', async (req, res) => {
    

    if (!req.params.album) return res.status(400).send('Missing album')
    if (!req.params.art) return res.status(400).send('Missing art')


    let albumPath = GALLERY_PATH + '/' + RESUME_FOLDER + '/' + req.params.album;

    let file = req.params.art
    let foundResume = await db.get({name: file});
    let imageData = {}
    fs.readdirSync(albumPath, { withFileTypes: true })
      .filter(dirent => dirent.isDirectory())
      .map(dirent => dirent.name)
      .forEach(folder => {

        if (fs.existsSync(albumPath + '/' + folder + '/' + file)) {
          let bitmap = fs.readFileSync(albumPath + '/' + folder + '/' + file)
          let dimensions = sizeOf(albumPath + '/' + folder + '/' + file)

          imageData.image = Buffer.from(bitmap).toString('base64')
          imageData.size = {width: dimensions.width, height: dimensions.height}
          imageData.name = file
          imageData.resume = foundResume && foundResume.length > 0 ? foundResume[0].resume.replace(/\\"/g, '"') : undefined
          imageData.ignored = foundResume && foundResume.length > 0 ? foundResume[0].ignored === "1": undefined
        }
    })

    return res.json(imageData)
  })
  
  app.post('/art/set', async (req, res) => {
    const {albumName, imageName, resume, ignored} = req.body

    if (!albumName || !imageName) return res.status(400).send('Missing albumName or imageName')

    console.log(`Set `, {name: imageName, resume: resume, ignored: ignored ? 1 : 0})  

    let foundResume = await db.get({name: imageName});
    if (foundResume && foundResume.length > 0) {
      await db.edit({name: imageName}, {resume: resume, ignored: ignored ? "1" : "0"});
    } else {
      await db.add({name: imageName, resume: resume, ignored: ignored ? "1" : "0"});
    }

    return res.json({status: 'ok'});
  })

  // catch 404
  app.use((req, res, next) => {
    const err = new Error('Not Found')
    err.status = 404
    next(err)
  })

  app.use((err, req, res, next) => res.status(err.status || 500).send(err.message || 'There was a problem'))

  const server = app.listen(PORT)
  console.log(`Listening at http://localhost:${PORT}`)  
})

fs.createReadStream(GALLERY_PATH + '/' + RESUME_FOLDER + '/' + RESUME_FILE).pipe(parser);

process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  // some other closing procedures go here
  exec('npm stop');
  process.exit(0);
});
//sudo mount -v -t nfs -o vers=4.0 192.168.1.65:/tmp/gfgallery /home/alex/git/podpisaka/server/gallery