const processContact = contact => ({
    name: `${contact.name.first} ${contact.name.last}`,
    phone: contact.phone,
})

export const fetchUsers = async () => {
    const response = await fetch('https://randomuser.me/api/?results=50&nat=us')
    const {results} = await response.json()
    return results.map(processContact)
}

export const fetchGallery = async () => {
    const response = await fetch('http://localhost:8000/getGallery', {
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

export const fetchAlbum = async () => {
    const response = await fetch('http://localhost:8000/getAlbum', {
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
export const login = async (username, password) => {
    const response = await fetch('http://localhost:8000/login', {
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