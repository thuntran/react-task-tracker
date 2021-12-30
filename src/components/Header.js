// Header.js: H is capitalized - convention for Components
// Type rafce + Enter to create a boilerplat of a component of an arrow function component
// import React from 'react' // No longer need this anymore, cna get rid of it
import PropTypes from 'prop-types' // Type impt and Enter to import PropTypes
import { useLocation } from 'react-router-dom' // Look at the route that we are currently on
import Button from './Button'

const Header = ({ title, onAdd, showAdd }) => {
    const location = useLocation()
    return (
        <header className='header'>
            <h1 >{title}</h1>
            {location.pathname === '/' && (
            // The button will be gone in the About page
            <Button 
                color={showAdd ? "red" : "green"} 
                text={showAdd ? "Close" : "Add"} 
                onClick={onAdd}
            />
            )}
        </header>
    )
}

// Set a default prop (which is an object) to prevent errors
// This will show up in the html if it's empty in <Header /> in App.js
// If we write something in the Header tab in App.js, that will overwrite the default
Header.defaultProps = {
    title: 'Task Tracker'
}

// In App.js, if we provide a title of different type (number, boolean, etc.)
// the html will still be rendered but we will receive a warning of failed prop type

Header.propTypes = {
    title: PropTypes.string.isRequired
}

// // CSS in JS
// const headingStyle = {
//     color: 'red',
//     backgroundColor: 'black'

// }

export default Header

/* We can pass props into Header
In Header.js
const Header = (props) => {
    return (
        <header>
            <h1>{props.title}</h1>
        </header>
    )
}
In App.js
const App = () => {
  return (
    <div className="container">
      <Header title="Hello" /> // we already add a prop here
    </div>
  )
}
prop is an object so we can simplify be destructuring the prop into 
for e.g. { title }
*/

/* Direct CSS example:
<h1 style={{color: 'red', backgroundColor: 'black'}}>{title}</h1>
Put the styling in {{}}
Use camel instead of -
After :, put the properties in ''

Dynamic CSS styling example:
<h1 style={headingStyle}>{title}</h1>
const headingStyle = {
    color: 'red',
    backgroundColor: 'black'

}
*/
