ONE-TO-ONE

```js
const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = new mongoose.model("User", userSchema);

const postSchema = new mongoose.Schema({
    title: String,
    content: String,
    author:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
});

const Post = new mongoose.model("Post", postSchema);
```

ONE-TO-MANY

```js
const departmentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: String,
    employees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Employee"
    }]
});

const Department = new mongoose.model("Department", departmentSchema);

const employeeSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: String,
    salary: Number,
    hireDate: Date
})

const Employee = new mongoose.model("Employee", employeeSchema);
```
MANY-TO-MANY

```js
const courseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    students: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student"
    }]
});

const Course = new mongoose.model("Course", courseSchema);

const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: String,
    courses: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Course"
    }]
});

const Student = new mongoose.model("Student", studentSchema);
```