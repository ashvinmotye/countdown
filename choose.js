var categorySelect = document.querySelector('#category');
var sortSelect = document.querySelector('#sort');
var showSelect = document.querySelector('#show');

var categories = [];
var selectedArray = [];

for(var i=0; i<tasks.length; i++) {
  var temp = tasks[i].category;

  if(categories.indexOf(temp) === -1) {
    categories.push(temp);

    var optionElement = document.createElement('option');
    optionElement.innerHTML = temp;
    optionElement.value = temp;

    categorySelect.appendChild(optionElement);
  }
}

categorySelect.addEventListener('change', function() {
  var categoryNeeded = this.value;
  var sortOrder = Number(sortSelect.value);

  if(categoryNeeded === 'all') {
    populate(tasks, sortOrder);
  }

  else {
    selectedArray = filterArray(tasks, categoryNeeded);

    populate(selectedArray, sortOrder);
  }
  
});

sortSelect.addEventListener('change', function(){
  var categoryNeeded = categorySelect.value;
  var sortOrder = Number(this.value);

  if(categoryNeeded === 'all') {
    populate(tasks, sortOrder);
  }

  else {
    selectedArray = filterArray(tasks, categoryNeeded);
    populate(selectedArray, sortOrder);
  }

});

showSelect.addEventListener('change', function(){
  var categoryNeeded = categorySelect.value;
  var sortOrder = Number(sortSelect.value);

  if (categoryNeeded === 'all') {
    populate(tasks, sortOrder);
  }

  else {
    selectedArray = filterArray(tasks, categoryNeeded);
    populate(selectedArray, sortOrder);
  }
});

function filterArray(array, categoryNeeded) {
  return tasks.filter(task => task.category === categoryNeeded);
}