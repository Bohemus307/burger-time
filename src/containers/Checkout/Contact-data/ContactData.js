import React, { Component } from 'react';

import axios from '../../../axios-orders';

import classes from './ContactData.css';
import Button from '../../../components/UI/Button/Button';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Input from '../../../components/UI/Input/Input';

class ContactData extends Component {
  state = { 
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name'
        },
        value: '',
        validation: {
          required:true
        },
        valid:false
      },
      street: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street'
        },
        value: '',
        validation: {
          required:true
        },
        valid:false
      },
      zipcode: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Zipcode'
        },
        value: '',
        validation: {
          required:true,
          minLength: 5,
          maxLength: 5
        },
        valid:false,
      },
      country: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Country'
        },
        value: '',
        validation: {
          required:true
        },
        valid:false
      },
      email: {
        elementType: 'email',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Email'
        },
        value: '',
        validation: {
          required:true
        },
        valid:false
      },
      deliveryMethod: {
        elementType: 'select',
        elementConfig: {
            options: [
              {value: 'fastest', displayValue: 'Fastest'}, 
              {value: 'slowest', displayValue: 'Slowest'}
            ]
        },
        value: ''
      }
    },
    loading: false,
  }

  checkValidity = (value, rules) => {
    let isValid = true;

    if (rules.required) {
      isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
      isValid = value.length >= rules.minLength && isValid;
    }

    if (rules.maxLength) {
      isValid = value.length <= rules.maxLength && isValid;
    }

    return isValid;
  }

  orderHandler = ( event ) => {
    event.preventDefault()
    // request 
    this.setState({ loading: true })

    const formData = {};
    for (let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      orderData: formData
    }
    axios.post('/orders.json', order)
    .then(response => {
      this.setState({ loading:false });
      this.props.history.push('/');

    })
    .catch((error) => {
      this.setState({ loading:false });
    })
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const updatedOrderForm = { 
      ...this.state.orderForm 
    };
    // deeper clone
    const updatedFormELement = { 
      ...updatedOrderForm[inputIdentifier] 
    };
    updatedFormELement.value = event.target.value;
    updatedFormELement.valid = this.checkValidity(updatedFormELement.value, updatedFormELement.validation)
    updatedOrderForm[inputIdentifier] = updatedFormELement;
    console.log(updatedFormELement)
    this.setState({
      orderForm: updatedOrderForm
    });
  }

  render() {
    const formElementsArray = [];

    for (let key in this.state.orderForm) {
      formElementsArray.push({
        id: key,
        config: this.state.orderForm[key]
      })
    }

    let form = (
      <form onsubmit={this.orderHandler}>
        {formElementsArray.map(formElement => (
            <Input 
              key={formElement.id}
              elementType={formElement.config.elementType} 
              elementConfig={formElement.config.elementConfig} 
              value={formElement.config.value}
              changed={(event) => this.inputChangedHandler(event, formElement.id)} />
        ))}
        <Button btnType='Success' clicked={this.orderHandler}>ORDER</Button>
      </form>
    );
    if (this.state.loading) {
      form = <Spinner />;
    }
    return (
      <div className={classes.ContactData}>
        <h4>Enter your contact data</h4>
        {form}
      </div>
    );
  }
}

export default ContactData;
