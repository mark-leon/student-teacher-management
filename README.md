To run this app, at first clone this repo, then go to student-teacher-management/server. Then run this script
#npm install
#npm run dev

After then
go to student-teacher-management/client/student-teacher-management. Then run this script
#npm install
#npm run dev




School Management System - Frontend Documentation
Overview
The frontend for this system has the features including  user authentication, dashboard views, and Create, update, read operations for both students and teachers.
Tech Stack for Frontend
Vue.js 
Vuex (State Management)
Vue Router
Axios 
Tailwind CSS (Styling)
Project Structure


client/student-teacher-management/src/
├── assets/
│   └── main.css
├── components/
│   ├── DataForm.vue      # Reusable form component
│   ├── DataTable.vue     # Reusable table component
│   └── SearchBar.vue     # Reusable search component
├── router/
│   └── index.js          # Route configurations
├── store/
│   └── index.js          # Vuex store configuration
├── views/
│   ├── App.vue           # Root component
│   ├── Dashboard.vue     # Main dashboard view
│   ├── Login.vue         # Authentication view
│   ├── Students.vue      # Student management view
│   └── Teachers.vue      # Teacher management view
└── main.js               # Application entry point
Core Components
1. App.vue
This is the root component where it has responsive navigation for mobile and desktop. It handles authentication and logout functions and based on the state of authentication, there are some routes like students, teachers and dashboard which are protected.
2. Views
Login.vue
The Login.vue handles user authentication using a form of username and password. The username is “admin”, password is “admin123”. If the login is successful, then it redirect to dashboard 
Dashboard.vue
The dashboard will render if login is successful. It has the access of student and teacher sections in a card.
Students.vue & Teachers.vue
This section has the data of students and teachers. Both students and teachers' information are shown in a table with search functionality. It has also update feature for students and teachers information 
3. Reusable Components
DataForm.vue
A  form component for adding new students and teachers. 
DataTable.vue
A table component for displaying data for students and teachers.
SearchBar.vue
Reusable search input component
State Management (Vuex)
Store Structure
state: {
  token: null,          // Authentication token
  students: [],         // Student data
  teachers: []          // Teacher data
}


Actions
login: Handle user authentication
logout: Clear user session
fetchStudents: fetch student data
fetchTeachers: fetch teacher data


Routes:

/login: Login page
/dashboard: Main dashboard
/students: Student management
/teachers: Teacher management
Protected Navigation
Checks the status authentication
Redirects to login if the access is not authorized.



API Integration
Base URL: http://localhost:3000/api
Endpoints:
/login: POST - User authentication
/students: GET, POST, PUT - Student management
/teachers: GET, POST, PUT - Teacher management
Authentication: Bearer token


Styling
Used Tailwind CSS for  styling and responsive design




School Management System - Backend Documentation


Tech Stack for Backend
Express js
Node js

## Base URL : http://localhost:3000/api

Here is the details of each endpoint

### Login
The login endpoint authenticates user information and returns a jwt token.


## Students API

### Get All Students
Retrieve a list of all students.

**Endpoint:** `GET request to  /students`  
**Authentication:** is  required  
**Response:** Array of student objects


### Create Student
Add a new student to the system.

**Endpoint:** `POST request to  /students`  
**Authentication:** is Required  
**Request Body:** Student object (without an id)


**Response:** Created student object with id

### Update Student
Update an existing student's information.

**Endpoint:** `PUT request to  /students/:id`  
**Authentication:** is Required  
**Parameters:** id (number) - Student id  



**Response:** Created student object with ID

### Update Student
Update an existing student's information.

**Endpoint:** `PUT request to  /students/:id`  
**Authentication:** is  Required  
**Parameters:** id (number) - Student id  



### Create Teacher
Add a new teacher to the system.

**Endpoint:** `POST request to  /teachers`  
**Authentication:** is Required  
**Request Body:** Teacher object (without id)


**Response:** Create teacher object with an id

### Update Teacher
Update an existing teacher's information.

**Endpoint:** `PUT request to  /teachers/:id`  
**Authentication:** is Required  
**Parameters:** id (number) - Teacher id  
**Request Body:** Fields to update


As the feature is to store the student and teacher information in an array, so there is no need to integrate a database connection with the backend server.

