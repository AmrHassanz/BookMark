var siteNameInput = document.getElementById('siteName');
var siteUrlInput = document.getElementById('siteUrl');
var searchInput = document.getElementById('searchInput');

var bookmarkContainer;
if (localStorage.getItem('bookMarks') != null) {
    bookmarkContainer = JSON.parse(localStorage.getItem('bookMarks'));
    displayBookmark();
}
else {
    bookmarkContainer = [];
};

function addBookmark() {
    if (validateSiteName() == true && validateSiteUrlInput() == true) {
        var bookmark = {
            name: siteNameInput.value,
            url: siteUrlInput.value
        }
        bookmarkContainer.push(bookmark);
        localStorage.setItem('bookMarks', JSON.stringify(bookmarkContainer));
        displayBookmark();
        clearForm();
    }
    else {
        alert("please check inputs");
    };
}

function displayBookmark() {
    var cartoona = '';
    for (var i = 0; i < bookmarkContainer.length; i++) {
        cartoona += `   <tr>
<td>${i}</td>
<td>${bookmarkContainer[i].name}</td>
<td class="text-end"><a target="_blank" class="btn btn-outline-warning" href="${bookmarkContainer[i].url}">Visit</a></td>
<td onclick="deleteBookmark(${i})" class="text-end"><button class="btn btn-outline-success">Delete</button></td>
</tr>`
    }
    document.getElementById('tableRow').innerHTML = cartoona;
}

function clearForm() {
    siteNameInput.value = '';
    siteUrlInput.value = '';
}

function deleteBookmark(index) {
    bookmarkContainer.splice(index, 1);
    localStorage.setItem('bookMarks', JSON.stringify(bookmarkContainer));
    displayBookmark()
}

function searchBookmark() {
    var cartoona = '';
    for (var i = 0; i < bookmarkContainer.length; i++) {
        if (bookmarkContainer[i].name.toLowerCase().includes(searchInput.value.toLocaleLowerCase()) == true) {
            cartoona += `   <tr>
            <td>${i}</td>
            <td>${bookmarkContainer[i].name}</td>
            <td class="text-end"><a target="_blank" class="btn btn-outline-warning" href="${bookmarkContainer[i].url}">Visit</a></td>
            <td onclick="deleteBookmark(${i})" class="text-start"><button class="btn btn-outline-success">Delete</button></td>
            </tr>`
        }
    }
    document.getElementById('tableRow').innerHTML = cartoona;
}

var nameAlert = document.getElementById('nameAlert');
function validateSiteName() {
    var regex = /^[A-Z]/;
    if (siteNameInput.value == '') {
        nameAlert.style.display = 'none';
    }
    else {
        if (regex.test(siteNameInput.value) == true) {
            nameAlert.style.display = 'none';
            return true;
        }
        else {
            nameAlert.style.display = 'block';
            return false;
        }
    }
}
siteNameInput.addEventListener('blur', validateSiteName);

var nameAlert2 = document.getElementById('nameAlert2');
function validateSiteUrlInput() {
    var regex = /^(https?|chrome):\/\/[^\s$.?#].[^\s]*$/;
    if (siteUrlInput.value == '') {
        nameAlert2.style.display = 'none';
    }
    else {
        if (regex.test(siteUrlInput.value) == true) {
            nameAlert2.style.display = 'none';
            return true;
        }
        else {
            nameAlert2.style.display = 'block';
            return false;
        }
    }
}
siteUrlInput.addEventListener('blur', validateSiteUrlInput);

