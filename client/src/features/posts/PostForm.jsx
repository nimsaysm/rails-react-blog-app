import { useState } from "react";
import PropTypes from "prop-types";
import "../../assets/styles/PostForm.css"

// receives the props of the components that call it
function PostForm({ post, headerText, onSubmit, buttonText }) {
  const [formData, setFormData] = useState(
    // will use the existing post (edit context) or empty fields 
    post || {
      title: "",
      body: "",
      image: "",
    }
  );

  return (
    <div className="post-form">
      <h2>{headerText}</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onSubmit(formData); // function received by props
        }}
      >
        <div className="post-input">
          <label htmlFor="title">Title:</label>
          <input
            id="title"
            type="text"
            value={formData.title}
            required
            onChange={(e) =>
              setFormData({
                ...formData,
                title: e.target.value,
              })
            }
          />
        </div>
        <div className="post-input">
          <label htmlFor="body">Body:</label>
          <textarea
            id="body"
            value={formData.body}
            onChange={(e) =>
              setFormData({
                ...formData,
                body: e.target.value,
              })
            }
          />
        </div>
        <div className="post-input">
          <label htmlFor="image">Image:</label>
          <input 
            id="image" 
            type="file" 
            accept="image/*" 
            onChange={(e) => {
              setFormData ({
                ...formData, 
                image: e.target.files[0], 
              })
            }} 
          />
        </div>
        <div>
          <button type="submit">{buttonText}</button>
        </div>
      </form>
    </div>
  );
}

// expected props and their types
PostForm.propTypes = {
  post: PropTypes.shape({
    title: PropTypes.string.isRequired,
    body: PropTypes.string,
    image: PropTypes.any,
  }),
  headerText: PropTypes.string.isRequired,
  onSubmit: PropTypes.func.isRequired,
  buttonText: PropTypes.string.isRequired,
};

PostForm.defaultProps = {
  post: null,
};

export default PostForm;