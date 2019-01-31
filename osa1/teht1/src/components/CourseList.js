import React from 'react'

const Header = (props) => {
    return (
        <>
          <h1>{props.course}</h1>  
        </>
    )
}

const Part = ({name, exercises}) => {
    return (
        <div>
            <p>
              {name} {exercises}
            </p>
        </div>
    )
}

const Content = ({parts}) => {
    const rows = () => parts.map(part => 
                <Part key={part.id} name={part.name} exercises={part.exercises} />)
    return (
        <>
            {rows()}
        </>
    )
}

const Total = ({parts}) => {
    const reducer = (accumulator, currentValue) => accumulator + currentValue.exercises;
    return (
        <>
           <p>yhteensä {parts.reduce(reducer, 0)} tehtävää</p> 
        </>
    )
}

const Course = ({course}) => {
    return (
        <>
            <Header course={course.name} />
            <Content parts={course.parts} />
            <Total parts={course.parts} />
        </>
    )
}

const CourseList = ({courses}) => {
    const rows = () => courses.map(course =>
            <Course key={course.id} course={course} />
        )
    

    return (
        <>
            {rows()}
        </>
    )

}

export default CourseList