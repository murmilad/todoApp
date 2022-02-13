import {store} from './redux/store';

let config = {};
store.subscribe(() => {
    // When state will be updated(in our case, when items will be fetched), 
    // we will update local component state and force component to rerender 
    // with new data.

    config = store.getState().config;
});

const processContact = contact => ({
    name: `${contact.name.first} ${contact.name.last}`,
    phone: contact.phone,
})


export const fetchConnection = async () => {
    console.log('fetch ', 'http://'+config.server+':'+config.port+'/check')

    const response = await fetch('http://'+config.server+':'+config.port+'/check', {
           method: 'GET',
           headers: {'content-type' : 'application/json'},
    })
    console.log('response  ', response)

    if (response.ok){
        console.log('response ok ', response)
        const status = await response.json()
        return status
    }

    const errorMessage = await response.text()

    console.log('errorMessage ', errorMessage)

    throw new Error(errorMessage)
}

export const fetchGallery = async () => {
    const response = await fetch('http://'+config.server+':'+config.port+'/gallery', {
           method: 'GET',
           headers: {'content-type' : 'application/json'},
    })
    
    if (response.ok){
        const gallery = await response.json()
        return gallery
    }

    const errorMessage = await response.text()

    console.log('errorMessage ', errorMessage)

    throw new Error(errorMessage)
}

export const fetchAlbum = async (name) => {
    const response = await fetch('http://'+config.server+':'+config.port+'/album/' + name, {
           method: 'GET',
           headers: {'content-type' : 'application/json'},
    })
    
    if (response.ok){
        const album = await response.json()
        return album
    }

    const errorMessage = await response.text()

    console.log('errorMessage ', errorMessage)

    throw new Error(errorMessage)
}

export const fetchImage = async (albumName, imageName) => {
    const response = await fetch('http://'+config.server+':'+config.port+'/album/' + albumName + '/image/' + imageName, {
           method: 'GET',
           headers: {'content-type' : 'application/json'},
    })
    
    if (response.ok){
        const image = await response.json()
        return image
    }

    const errorMessage = await response.text()

    console.log('errorMessage ', errorMessage)

    throw new Error(errorMessage)
}

export const fetchArt = async (albumName, imageName) => {
    const response = await fetch('http://'+config.server+':'+config.port+'/album/' + albumName + '/art/' + imageName, {
           method: 'GET',
           headers: {'content-type' : 'application/json'},
    })
    
    if (response.ok){
        const image = await response.json()
        return image
    }

    const errorMessage = await response.text()

    console.log('errorMessage ', errorMessage)

    throw new Error(errorMessage)
}

export const saveArt = async (albumName, imageName, resume, ignored) => {
    const response = await fetch('http://'+config.server+':'+config.port+'/art/set', {
           method: 'POST',
           headers: {'content-type' : 'application/json'},
           body: JSON.stringify({albumName, imageName, resume, ignored}),
    })
    
    if (response.ok){
        const image = await response.json()
        return image
    }

    const errorMessage = await response.text()

    console.log('errorMessage ', errorMessage)

    throw new Error(errorMessage)
}

export const login = async (username, password) => {
    const response = await fetch('http://'+config.server+':'+config.port+'/login', {
           method: 'POST',
           headers: {'content-type' : 'application/json'},
           body: JSON.stringify({username,password}),
    })
    
    if (response.ok){
        const {token} = await response.json()
        return token
    }

    const errorMessage = await response.text()

    console.log('errorMessage ', errorMessage)

    throw new Error(errorMessage)
}