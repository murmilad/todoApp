
const express = require('express')
const bodyParser = require('body-parser')
const { exec } = require('child_process')

const PORT = process.env.PORT || 8000

const GALLERY_PATH = './gallery'
const RESUME_FOLDER = 'resume'
const RESUME_FILE = 'resume.txt'


const app = express()
app.use(bodyParser.json())

var fs = require('fs');

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


// Gallery

app.get('/getGallery', (req, res) => {

  let resume = {};

  let data = fs.readFileSync(GALLERY_PATH + '/' + RESUME_FOLDER + '/' + RESUME_FILE, 'utf8')

  data.split('\r\n').map(function(line){ 
    resume[line.split('|')[0]] = line.split('|')[1]
  })


  let albumPath = GALLERY_PATH + '/' + RESUME_FOLDER;
  let gallery = [];
  fs.readdirSync(albumPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .forEach(main_folder => {

      let imageCount = 0;
      let signedImageCount = 0;

      fs.readdirSync(albumPath + '/' + main_folder, { withFileTypes: true })
        .filter(dirent => dirent.isDirectory())
        .map(dirent => dirent.name)
        .forEach(folder => {

          fs.readdirSync(albumPath + '/' + main_folder + '/' + folder)
            .forEach( file => {
              if (resume[file]) signedImageCount++
              imageCount++
            })
        })

      let albumData = {}

      albumData.name = main_folder
      albumData.imageCount = imageCount
      albumData.unsignedImageCount = imageCount - signedImageCount
      gallery.push(albumData)


    })

  return res.json(gallery)
})


// Album

app.get('/getAlbum:album', (req, res) => {
  

  if (!req.params.album) return res.status(400).send('Missing album')

  let resume = {};

  let data = fs.readFileSync(GALLERY_PATH + '/' + RESUME_FOLDER + '/' + RESUME_FILE, 'utf8')

  data.split('\r\n').map(function(line){ 
    resume[line.split('|')[0]] = line.split('|')[1]
  })


  let albumPath = GALLERY_PATH + '/' + RESUME_FOLDER + '/' + req.params.album;
  let albumList = [];
  fs.readdirSync(albumPath, { withFileTypes: true })
    .filter(dirent => dirent.isDirectory())
    .map(dirent => dirent.name)
    .forEach(folder => {

      fs.readdirSync(albumPath + '/' + folder).forEach( file => {

        let imageData = {}
        let bitmap = fs.readFileSync(albumPath + '/' + folder + '/' + file)

        imageData.thumbnail = Buffer.from(bitmap).toString('base64')
        imageData.name = file
        imageData.resume = resume[file]
        albumList.push(imageData)
      })
  })

  return res.json(albumList)
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

process.on('SIGINT', function() {
  console.log( "\nGracefully shutting down from SIGINT (Ctrl-C)" );
  // some other closing procedures go here
  exec('npm stop');
  process.exit(0);
});
//sudo mount -v -t nfs -o vers=4.0 192.168.1.65:/tmp/gfgallery /home/alex/git/podpisaka/server/gallery