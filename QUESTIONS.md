# Part 2

### 1. What is the difference between Component and PureComponent? Give an example where it might break my app.

#### Components

Components are building blocks of React application.
and single application contains multiple reusable components.
with the help of components we can easily create UI.
There are two types of components

*  Class Components
   Class Components have a render() method that returns React elements describing what should be rendered.
   They have state and lifecycle methods.
   They are suitable for complex components that require state management, lifecycle methods, and other advanced features.

* Functional Components
   Functional components are simple JavaScript functions that accept props and return React elements describing what should be rendered.
   With the hooks introduction in React, functional components can now also have state and lifecycle features using hooks like useState, useEffect.


   #### example for Class vs Functional Components


   ##### Class Component

```javascript
    import React, { Component } from 'react';

    class HelloWorld extends Component {
    render() {
        return
            <div>Hello, { this.props.name } < /div>
        }
    }

    export default HelloWorld;
```



   ##### Functional Component

```javascript
    import React from 'react';

    const HelloWorld = (props) => {
    return
        <div>Hello, { props.name } < /div>;
    };

    export default HelloWorld;
```


#### Pure Components

Pure components extends React.PureComponent instead of React.Component.
It implements a shouldComponentUpdate().
When props or state changes, PureComponent will do a shallow comparison on current props and state with the next props and state.
If there are no differences between the current and next props or state, shouldComponentUpdate() returns false, preventing unnecessary re-renders.
so, for simple data structure Pure Component's shallow comparison works fine but in case of mutation of nested object or complex data structures, shallow comparison may not detect changes which results in stale components.


### 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

With the help of Context you can pass data through component tree without passing props manually to every level.
By default, shouldComponentUpdate returns true, meaning the component will re-render whenever its props or state change, if it returns false it will not re-render current component but child component will re-render if their props or state change.
As Context changes are not accounted for in the shouldComponentUpdate logic. Hence, re-render will occur even if shouldComponentUpdate returns false, that may break developers intended logic.
Also causes performance issues. 


### 3. Describe 3 ways to pass information from a component to its PARENT.

1. State Lifting
This is one of the method which I have used recently where we moved state one level up in hierarchy.


```javascript
                          <WallDashboard />
                  <WallHeader />          <WallBody />
```

Here we had a case as shown above, we have filters in WallHeader component and based on that filters WallBody should render. so we moved all filters to WallDashboard and then passed it to WallHeader and WallBody.


2. Callback function
We can send callback function as a prop from parent to child component. Child component can then call this callback function with required data as arguments.In this way, child passes data to parent component.



### 4. Give 2 ways to prevent components from re-rendering.

1. React.Memo()
React.memo prevent a component from re-rendering if its props or state haven't changed based on a shallow comparison.


```javascript
import React from 'react';

const HelloWorld = React.memo(({ greetings }) => {
  return <div>{greetings}</div>;
});
```


2. shouldComponentUpdate
It is a lifecycle method which allows you to write custom logic which returns true or false values depends on this, it allows component to re-render or not.


```javascript
import React, { Component } from 'react';

class HelloWorld extends Component {
  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.greeting !== this.props.greeting;
  }

  render() {
    return <div>{this.props.greeting}</div>;
  }
}
```


### 5. What is a fragment and why do we need it ? Give an example where it might break my app.

With the help of fragments you can wrap multiple children without adding extra node to DOM
* It avoids unnecessary DOM elements: which helps HTML clean and avoid nesting which affect css and layout.
* Avoid extra css selectors: when used fragments it reduces complexity of css selectors.
* Performance Optimization : Fragments helps to optimize the performance of your application by reducing number of DOM elements.

  
```javascript
<> </> 
```

if closing tag forgotten it will show syntax error and break your app.



### 6. Give 3 examples of the HOC pattern.
skipped.



### 7. What's the difference in handling exceptions in promises, callbacks and async...await?

When handling exceptions in above it has differences in syntax and how error is handled.

1. Promises
  * Promises use .then() and .catch() methods to catch success and error respectively.


  ```javascript
  myPromise()
  .then(result => {
      //Success Handling
  })
  .catch(error => {
    //Error Handling
  });

  ```


2. Callbacks
  * Callbacks are functions which are passed as arguments to another function.
  * Error as the first argument passed in callback function. 


  ```javascript
  function callbackFun(error, result) {
    if(error){
       //Error Handling
    }else{
       //Success Handling
    }
  }
  anotherFunction(callbackFun);

  ```


3. async...await
  * async function returns promise and await is used to pause the execution and wait for promise.
  * Error handling is handled with try and catch block.


```javascript
  async function asyncFun() {
   try {
      const result = await myPromise();
      //Success Handling
   }catch (error) {
    //Error Handling
   }
  }
  ```



### 8. How many arguments does setState take and why is it async?

We use setState() to update the state of the component. Two arguments we can pass in setState.
1. Object

   
```javascript
    setState({message: 'Hello'})
```


2. Callback Function
setState also accepts optional second argument as callback function which will be called after the state has been updated and the component has been re-rendered. 


```javascript
    this.setState({ message :'Welcome' },() => {
    console.log(this.state.message);
  });
```


As per React, whenever state changes, affected components need to be re-rendered but in a single application there are multiple states getting changed using setState method. which results frequent re-rendering of same component. To avoid this, React batches setState operation, that's why it is asynchronous in nature as react execute it each setState from queue.



### 9. List the steps needed to migrate a Class to Function Component.

Below are the steps to migrate.
1. Understand the functionality of existing class component.
2. Create functional component. 
3. Remove render method.
4. Convert state variables to useState hook.
5. Identify methods in class components and write them with regular function.
6. Remove lifecycle methods, as function component uses hooks.
7. Remove reference to this and bindings of event.



### 10. List a few ways styles can be used with components.

We can use style with different ways.
1. inline style
2. CSS class
3. styled components
4. Bootstrap css classes.



### 11. How to render an HTML string coming from the server.

We can use dangerouslySetInnerHTML attribute in React. With the use of dangerouslySetInnerHTML, it allow React to render HTMl string as DOM elements. It bypasses React's built in XSS protection making sure that content you are rendering is trusted and avoid security vulnerabilities.


```javascript
const HTMLRenderer = ({ htmlString }) => {
  return (
    <div dangerouslySetInnerHTML={{ __html: htmlString }} />
  );
};
```
