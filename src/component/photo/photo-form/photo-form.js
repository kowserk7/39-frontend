import React from 'react';
import { connect } from 'react-redux';

const fileToDataURL = file => {
  return new Promise((resolve,reject) => {
    if(!file)
      return reject(new Error('File is required'));

    let reader = new FileReader();
    reader.addEventListener('load', () => resolve(reader.result));
    reader.addEventListener('error',reject);

    return reader.readAsDataURL(file);
  });
};

class PhotoForm extends React.Component{
  constructor(props){
    super(props);
    this.emptyState = {
      preview: undefined,
      photo: '',
      photoDirty: false,
      photoError: 'Picture is required.',
      description: '',
      descriptionDirty: false,
      descriptionError: 'Description is required.',
    };
    
    this.state = this.emptyState;
    this.handleValidate = this.handleValidate.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleValidate({type,value,files}){
    let validImageTypes = ['image/png','image/jpeg','image/jpg'];
    switch(type){
    case 'file':{
      if(files.length !== 1)
        return 'You must only select one file';
      let imageType = files[0].type;
      if(!validImageTypes.includes(imageType))
        return 'The image must be a png or a jpg';
      return null;}
    default:
      return null;
    }
  }

  handleChange(event){
    let {type,value,files} = event.target;
    if(type === 'file'){
      let error = this.handleValidate(event.target);
      if(!error){
        fileToDataURL(files[0])
          .then(preview => this.setState({preview}));
      }
      this.setState({
        photo: files[0],
        photoError: error,
        photoDirty: true,
      });
    } else {
      this.setState({
        description: value,
        descriptionError : this.handleValidate(event.target),
        descriptionDirty: true,
      });
    }
  }

  handleSubmit(event){
    event.preventDefault();
    //TODO: if there is an error don't call oncomplete
    this.props.onComplete(this.state);
    this.setState(this.emptyState);
  }
  
  render(){
    return(
      <form
        onSubmit={this.handleSubmit}
        className='photo-form'>
        <img style={{width:'200px'}} src={this.state.preview} />
        <p>{this.state.photoError}</p>
        <label>Photo</label>
        <input
          type='file'
          name='photo'
          onChange={this.handleChange}/>
        <p>{this.state.descriptionError}</p>
        <label>Description</label>
        <input
          type='text'
          name='description'
          value={this.state.description}
          onChange={this.handleChange}/>
        <button
          type='submit'>
          upload photo
        </button>
      </form>
    );
  }
}

export default PhotoForm;