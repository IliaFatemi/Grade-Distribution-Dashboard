var grades, students;
let inputVal = []
const letterGrades = ['A+', 'A', 'A-', 'B+', 'B', 'B-', 'C+', 'C', 'C-', 'D', 'F']
const boundaryDefaultVal = [100, 95, 90, 85, 80, 75, 70, 65, 60, 55, 50, 0]
const button = document.getElementById('resetVal');

//functionality for the reset button. Resetting all values to default values
button.addEventListener('click', (event) => {
  var b = document.querySelectorAll("figure.lower-bound-table input")
  for(var i = 0; i < b.length; i++){
    b[i].value = boundaryDefaultVal[i]
    inputVal[i] = boundaryDefaultVal[i]
  }
  if(grades != null){
    createGraph()
  }
});

//loading the CSV file
function loadFile(input){
    var file = input.files[0];
    var reader = new FileReader();
    reader.readAsText(file);

    reader.onload = function() {
      file = reader.result.split("\n");
      var processed_data = pre_process(file.splice(1));
      document.getElementById('filename').innerHTML = `Openned: ${input.files[0].name}`
      document.getElementById('csvinput').innerHTML = `<input class="file-input" id="fileInput" type="file" accept=".csv" name="file" oninput="loadFile(this)">`
      var child = document.getElementById('noData')
      if(child != null){
        child.parentNode.removeChild(child)
      }
      grades = processed_data[0];
      students = processed_data[1];
      displayStats();
      createGraph();
    };
      
    reader.onerror = function() {
      console.log(reader.error);
    };
}

//taking the file data as an array and returning an array of all grades and another array of students with their grades
function pre_process(students){
  const grades = [];
  const processed_stud = []
  for(var i =0; i < students.length; i++){
    var student = students[i].split(',');
    grades.push(parseFloat(student[1]));
    processed_stud.push([student[0].trim(), parseFloat(student[1])]);
  }
  return [grades, processed_stud];
}

//Showing results in the stats
function displayStats(){
  var max = getMax(students)
  var min = getMin(students)
  document.getElementById('highest').innerHTML = max[0]+" ("+max[1]+"%)";
  document.getElementById('lowest').innerHTML = min[0]+" ("+min[1]+"%)";
  document.getElementById('mean').innerHTML = getMean(grades);
  document.getElementById('median').innerHTML = getMedian(grades);
}

//finding the maximum grade and returning that grade with the students name
function getMax(students){
  var max_stud = students[0];
  for (var i = 0; i < students.length; i++){
    if(students[i][1] > max_stud[1]){
      max_stud = students[i];
    }
  }
  return max_stud;
}

//finding the Min grade and returning that grade with the students name
function getMin(students){
  var min_stud = students[0];
  for (var i = 0; i < students.length; i++){
    if(students[i][1] < min_stud[1]){
      min_stud = students[i];
    }
  }
  return min_stud;
}

//Getting the mean of grades
function getMean(grades){
  sum = 0;
  for (var i = 0; i < grades.length; i++){
    sum += grades[i];
  }
  return (sum/grades.length).toFixed(2);
}

//getting the median of grades
function getMedian(grades){
  var sorted_grades = grades.sort(function(a, b){return a-b;});
  if(sorted_grades.length % 2 == 0){
    return ((sorted_grades[Math.floor(sorted_grades.length/2)-1] + sorted_grades[Math.floor(sorted_grades.length/2)])/2).toFixed(2);
  }else{
    return (sorted_grades[Math.floor(sorted_grades.length/2)]).toFixed(2);
  }
}

//taking the input values and grades to calculate where each grade will fall within the bounds.
//returning an array that contains an array of the letter grade and the number of grades in that range of grade
function calculateBounds(inputVal, grades){
  const bucket_range = []
  var count = 0
  for(var i = 1; i < inputVal.length; i++){
    for(var j = 0; j < grades.length; j++){
      if(grades[j] < inputVal[i-1] && grades[j] >= inputVal[i]){
        count += 1
      }
    }
    bucket_range.push([inputVal[i-1], count])
    count = 0
  }
  return bucket_range
}

//Collecting the values from the input
function getBoundaryInputs(){
  var b = document.querySelectorAll("figure.lower-bound-table input")
  for(var i = 0; i < b.length; i++){
    inputVal.push(parseFloat(b[i].getAttribute('value')))
  }
}

//Checking if the value is a numerical value
function isNum(val){
  return !isNaN(val)
}

//Validating the users input values upon entry
function validate(input){
  if(!isNum(input.value)){
    alert("INVALID FIELD: Field must be a number.")
      document.getElementById(input.id).value = inputVal[input.id]
  }else if(parseFloat(input.value) < 0){
    alert("INVALID INPUT: Value must be greater than 0.")
    document.getElementById(input.id).value = inputVal[input.id]
  }else if(input.value == ""){
    alert("Field cannot be empty.")
    document.getElementById(input.id).value = inputVal[input.id]
  }else if(!isInBounds(input.id, input.value)){
    alert("INVALID INPUT: Value must be between bounds.");
    document.getElementById(input.id).value = inputVal[input.id]
  }else{
    document.getElementById(input.id).setAttribute('value', input.value)
    inputVal = []
    getBoundaryInputs();
    if(students != null){
      displayStats();
      createGraph();
    }
  }
}

//Creating the graph
function createGraph(){
  document.getElementById('histogram').innerHTML = ''
  bucket_range = calculateBounds(inputVal, grades)
  const column_tags= []
  var num_bar = ''
  for(var i = 0; i < bucket_range.length; i++){
    for(var j = 0; j < bucket_range[i][1]; j++){
      if(j == bucket_range[i][1]-1){
        num_bar += `<td class="bar" style="background-color: red;">${bucket_range[i][1]}</td>\n`
        break;
      }
      num_bar += `<td class="bar" style="background-color: red;"></td>\n`
    }
    column_tags.push(`<tr>\n\
    <td>${letterGrades[i]}</td>\n\
    ${num_bar}\n\
    </tr>`)
    num_bar = ''
  }

  for(var i = 0; i < column_tags.length; i++){
      document.getElementById('histogram').innerHTML += column_tags[i]
  }  
}

//creating and returning a copy of an array
function copyArray(array){
  var copy = []
  for(var i = 0; i < array.length; i++){
    copy.push(array[i])
  }
  return copy
}

//checking the bounds of a value
function isInBounds(id, num){
  copy = copyArray(inputVal).reverse()
  for(var i = copy.length - id - 2; i > 0; i--){
    if(num <= copy[i]){
      console.log(`LOWER BOUNDS\n id ${id}\n num ${num}\n index ${i}`)
      return false;
    }
  }

  for(var i = copy.length - id; i < copy.length; i++){
    if(num >= copy[i]){
      console.log(`id ${id}\n num ${num}\n index ${i}`)
      return false;
    }
  }
  return true;
}

//loading the necceities for the page.
//this function is called within the body tag
function loadStarters(){
  getBoundaryInputs()
}