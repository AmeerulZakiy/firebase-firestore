const studentList = document.querySelector('#student-list');
const form = document.querySelector('#add-student-form');


//create element and render 
function renderStudent(doc) {

    let li = document.createElement('li');
    let name = document.createElement('span');
    let age = document.createElement('span');
    let btn = document.createElement('button');

    li.setAttribute('data-id', doc.id);
    name.textContent = doc.data().name;
    age.textContent = doc.data().age;
    btn.innerHTML = "Delete"

    li.appendChild(btn);
    li.appendChild(name);
    li.appendChild(age);

    studentList.appendChild(li);

    //deleting data
    btn.addEventListener('click', (e) => {
        let id = e.target.parentElement.getAttribute('data-id');
        db.collection('student').doc(id).delete()
    })

}
// getting data
// db.collection('student').get().then((snapshot) => {
//     snapshot.docs.forEach(doc => {
//         renderStudent(doc);
//     })
// })

//saving data
form.addEventListener('submit', (e) => {
    e.preventDefault();
    db.collection('student').add({
        name: form.name.value,
        age: form.age.value,
    })
    form.name.value = '';
    form.age.value = '';
})


//getting data real-time listener using onSnapshot metod
db.collection('student').orderBy('name').onSnapshot(snapshot => {
    let changes = snapshot.docChanges();
    changes.forEach(change => {
        if (change.type == 'added') {
            renderStudent(change.doc)
        } else if (change.type == 'removed') {
            let id = document.querySelector('[data-id=' + change.doc.id + ']')
            studentList.removeChild(id);
        }
    })
})

