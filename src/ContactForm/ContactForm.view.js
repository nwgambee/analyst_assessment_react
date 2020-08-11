import React from 'react';
import './ContactForm.css';
import { appendErrors } from 'react-hook-form';

function ContactFormView(props) {
  const {
    // state & data
    loading,
    contactExistsError,
    showSuccessMessage,
    errors,
    // methods
    handleSubmit,
    register,
    onSubmit,
  } = props;

  // display loading message if loading
  if (loading) {
    return (
      <p className='loading_text' >Creating record...</p>
    )
  }
  return (
    <section className='contact_form_container'>
      <form className='contact_form' onSubmit={handleSubmit(onSubmit)}>
        <label className='form_label'>
          First Name: <br/>
          <input className='form_input' type='text' name='firstName' ref={register}/>
        </label>
        <label className='form_label'>
          Last Name: <br/>
          <input className='form_input' type='text' name='lastName' ref={register({ required: true })}/>
          {errors.lastName ? <p className='form_error_msg'>Last name is required</p> : null}
        </label>
        <label className='form_label'>
          Email: <br/>
          <input className='form_input' type='email' name='email' ref={register({ required: true })}/>
          {errors.email ? <p className='form_error_msg'>Email is required</p> : null}
        </label>
        <label className='form_label'>
          Phone: <br/>
          <input className='form_input' type='phone' name='phone' ref={register({ required: true })}/>
          {errors.phone ? <p className='form_error_msg'>Phone number is required</p> : null}
        </label>
        <label className='form_label'>
          Title: <br/>
          <input className='form_input' type='text' name='title' ref={register}/>
        </label>
        <p className='contact_exists_error'>{contactExistsError ? 'A contact for this name already exists, please enter a different name.' : null}</p>
        <p className='success_message'>{showSuccessMessage ? 'Contact has been successfully created!' : null}</p>
        <input className='submit_record_btn' type="submit" value="Create Record" />
      </form>
    </section>
  )
} 

export default ContactFormView;