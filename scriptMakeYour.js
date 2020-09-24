const list = document.getElementById('list');
const formName = document.getElementById('formName');
const formUrl = document.getElementById('formUrl');
const addButton = document.getElementById('addButton');
let updateButton = document.getElementById('updateButton');
const searchName = document.getElementById('searchName');
const searchName1 = document.getElementById('searchName1');
const xButton = document.getElementById('xButton');
const searchButton = document.getElementById('searchButton');


function findName() {
    console.log(searchName.value);

    fetch(`http://localhost:3000/images`)
        .then(function (response) {
            response.json().then(function (images) {
                findbyname(images);
            });
        });
};
function findbyname(images) {
    // remove image list if exist
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    // create and append tags
    for (let i = 0; i < images.length; i++)
    if(images[i].name==searchName.value) {
        // create image obj
        var pixi = 80;
        let img = document.createElement('img');
        img.src = images[i].img;
        img.width = pixi - 16;
        img.height = pixi - 16;
        img.style.borderRadius = "3px";
        // create name obj
        let name = document.createElement('div');
        name.innerText = images[i].name;
        name.classList.add('Buton');

        // create button and event for edit and delete
        let editButton = document.createElement('button')
        // add event on btn and pass image id more at https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
        editButton.addEventListener('click', function () {
            editImage(images[i])
        });
        editButton.innerText = 'Edit';
        editButton.classList.add('Buton');
        editButton.style.backgroundColor = "azure";
        let deleteButton = document.createElement('button')
        // add event on btn and pass image object more at https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
        deleteButton.addEventListener('click', function () {
            deleteImage(images[i].id)
        });
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('Buton');
        deleteButton.style.backgroundColor = "azure";
        // create a container for img and name
        let container = document.createElement('div');
        container.classList.add("legend-row");
        // append elements to container
        container.appendChild(img);
        container.appendChild(deleteButton);
        container.appendChild(editButton);
        container.appendChild(name);

        // append container to DOM (list div)
        list.appendChild(container);
    }
}
// fetch the images list
function getImages() {
    fetch('http://localhost:3000/images')
        .then(function (response) {
            // Trasform server response to get the images
            response.json().then(function (images) {
                appendImagesToDOM(images);
            });
        });
};

// post images
function postImage() {
    if(formName.value == '' || formUrl == '') {
        return ;
    }
    // creat post object
    const postObject = {
        name: formName.value,
        img: formUrl.value
    }
    // post image
    fetch('http://localhost:3000/images', {
        method: 'post',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(postObject)
    }).then(function () {
        // Get the new images list
        getImages();
        // Reset Form
        resetForm();
    });
}

// delete image
function deleteImage(id) {
    // delete image
    fetch(`http://localhost:3000/images/${id}`, {
        method: 'DELETE',
    }).then(function () {
        // Get the new images list
        getImages();
    });
}

// update image
function updateImage(id) {
    // creat put object
    const putObject = {
        name: formName.value,
        img: formUrl.value
    }
    // update image
    fetch(`http://localhost:3000/images/${id}`, {
        method: 'PUT',
        headers: {
            "Content-type": "application/json"
        },
        body: JSON.stringify(putObject)
    }).then(function () {
        // Get the new images list
        getImages();

        // change button event from update to add
        addButton.disabled = false;

        // remove all event from update button
        clearUpdateButtonEvents();

        // Reset Form
        resetForm();
    });
}

// copy edited image information to form and add event listener on update button
function editImage(image) {
    // copy image information to form
    formName.value = image.name;
    formUrl.value = image.img;
    
    // disable add button
    addButton.disabled = true;

    // clear all events update button events
    clearUpdateButtonEvents();

    // enable and add event on update button
    updateButton.disabled = false;
    updateButton.addEventListener('click', function () {
        updateImage(image.id)
    });

}

// Create and append img and name DOM tags
function appendImagesToDOM(images) {
    // remove image list if exist
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    // create and append tags
    for (let i = 0; i < images.length; i++) {
        // create image obj
        var pixi = 80;
        let img = document.createElement('img');
        img.src = images[i].img;
        img.width = pixi - 16;
        img.height = pixi - 16;
        img.style.borderRadius = "3px";
        // create name obj
        let name = document.createElement('div');
        name.innerText = images[i].name;
        name.classList.add('Buton');

        // create button and event for edit and delete
        let editButton = document.createElement('button')
        // add event on btn and pass image id more at https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
        editButton.addEventListener('click', function () {
            editImage(images[i])
        });
        editButton.innerText = 'Edit';
        editButton.classList.add('Buton');
        editButton.style.backgroundColor = "azure";
        let deleteButton = document.createElement('button')
        // add event on btn and pass image object more at https://stackoverflow.com/questions/256754/how-to-pass-arguments-to-addeventlistener-listener-function
        deleteButton.addEventListener('click', function () {
            deleteImage(images[i].id)
        });
        deleteButton.innerText = 'Delete';
        deleteButton.classList.add('Buton');
        deleteButton.style.backgroundColor = "azure";
        // create a container for img and name
        let container = document.createElement('div');
        container.classList.add("legend-row");
        // append elements to container
        container.appendChild(img);
        container.appendChild(deleteButton);
        container.appendChild(editButton);
        container.appendChild(name);

        // append container to DOM (list div)
        list.appendChild(container);
    }
}

// reset form
function resetForm() {
    formName.value = '';
    formUrl.value = '';
    searchName1.value = '';
}
//  remove Update Button to clear events more at https://stackoverflow.com/questions/9251837/how-to-remove-all-listeners-in-an-element
function clearUpdateButtonEvents() {
    let newUpdateButton = updateButton.cloneNode(true);
    updateButton.parentNode.replaceChild(newUpdateButton, updateButton);
    updateButton = document.getElementById('updateButton');
}
// add event listener on add button
addButton.addEventListener('click', postImage);
searchButton.addEventListener('click', function() {
    if(searchName1.value == '') {
        return;
    }
    while (list.firstChild) {
        list.removeChild(list.firstChild);
    }
    searchName.value = searchName1.value;
    findName(); 
});
// get images
getImages();