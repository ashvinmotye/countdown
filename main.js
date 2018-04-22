window.onload = populate(tasks, 0);

function populate(tasks, order) {
  var taskContainer = document.querySelector('.tasks-container');
  taskContainer.innerHTML = '';

  var NUMBER_OF_COLUMNS;

  if(document.documentElement.clientWidth <= 950) {
    NUMBER_OF_COLUMNS = 1;
  }

  else {
    NUMBER_OF_COLUMNS = 4;
  }

  for(var i=0; i<NUMBER_OF_COLUMNS; i++) {
    var col = document.createElement('div');
    col.classList.add('col');
    taskContainer.appendChild(col);
  }

  var columns = document.querySelectorAll('.col');

  tasks = sortTask(tasks, order);
  tasks = filterStatus(tasks);

  for(var j=0; j<tasks.length; j++) {
    var position = j % NUMBER_OF_COLUMNS;
    var columnElement = columns[position];
    createTaskElement(columnElement ,tasks[j]);
  }
}

function createTaskElement(parent, task) {
  var title = task.title;
  var deadline = task.deadline;
  var days = getDays(deadline);
  var taskElement, titleElement, daysElement;

  taskElement = document.createElement('div');
  taskElement.classList.add('task');

  titleElement = document.createElement('h1');
  titleElement.classList.add('title');
  titleElement.innerHTML = title;

  daysElement = document.createElement('h1');
  daysElement.classList.add('days');

  if (days <= 0) {
    taskElement.classList.add('complete');
    daysElement.innerHTML = "<i class='fas fa-thumbs-up'></i>";
  }

  else {
    daysElement.innerHTML = days;
  }

  taskElement.appendChild(titleElement);
  taskElement.appendChild(daysElement);
  parent.appendChild(taskElement);
}

function getDays(deadline) {
  var time = " 23:59:59";
  var date = deadline+time;
  
  var deadlineDate = new Date(date);
  var today = new Date();

  var difference = deadlineDate - today;
  difference = difference / 1000 / 60 / 60 / 24;
  difference = Math.floor(difference);

  return difference;
}

function sortTask(array, order) {
  // order = 0 => latest firt
  if(order === 0) {
    array = array.sort(function(a, b){
      var firstDate = new Date(a.deadline);
      var secondDate = new Date(b.deadline);

      return firstDate - secondDate;
    });

    return array;
  }

  // order = 1 => oldest first
  else if (order === 1) {
    array = array.sort(function (a, b) {
      var firstDate = new Date(a.deadline);
      var secondDate = new Date(b.deadline);

      return secondDate - firstDate;
    });

    return array;
  }
}

function filterStatus(array) {
  array = array.filter(element => {
    var today = new Date();
    var status = document.querySelector('#show').value;

    if(status === 'pending') {
      if(new Date(element.deadline) - today > 0) {
        return element;
      }
    }

    else if(status === 'completed') {
      if(new Date(element.deadline) - today <= 0) {
        return element;
      }
    }

    else {
      return element;
    }
  });

  return array;
}