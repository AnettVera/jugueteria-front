import React, { useRef, useState, useEffect } from 'react';
import Select from 'react-select';
import './../../assets/Components/general/Modal.scss';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';
import { useOutletContext } from 'react-router-dom';

const AddProductModal = ({ onClose, onSave }) => {
  const fileInputRefs = useRef([]);
  const [images, setImages] = useState([null, null, null, null, null]);
  const [categories, setCategories] = useState([]);
  const { handleAlert, handleRedirect } = useOutletContext() || {};

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:6868/toystore/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  const validationSchema = yup.object({
    name: yup
      .string()
      .max(100, 'El nombre no puede tener más de 100 caracteres')
      .required('El nombre es obligatorio'),
    description: yup
      .string()
      .max(500, 'La descripción no puede tener más de 500 caracteres')
      .required('La descripción es obligatoria'),
    quantity: yup
      .number()
      .integer('La cantidad debe ser un número entero')
      .min(0, 'La cantidad no puede ser negativa')
      .required('La cantidad es obligatoria'),
    price: yup
      .number()
      .min(0.01, 'El precio debe ser mayor que cero')
      .required('El precio es obligatorio'),
    categories: yup
      .array()
      .min(1, 'Debes seleccionar al menos una categoría')
      .required('Las categorías son obligatorias'),
    images: yup
      .array()
      .min(5, 'Debes subir al menos 5 imagenes')
      .test('at-least-one-image', 'Debes subir al menos una imagen', (value) =>
        value.every((image) => image !== null)
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      description: '',
      quantity: '',
      price: '',
      categories: [],
      images: images,
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        const category = categories.find(cat => cat.name === values.categories[0]);
        const formData = new FormData();
        formData.append('name', values.name);
        formData.append('description', values.description);
        formData.append('price', values.price);
        formData.append('category_id', category.id);
        formData.append('stock', values.quantity);
        values.images.forEach((image) => {
          if (image) {
            formData.append('images', image);
          }
        });

        const response = await axios.post('http://localhost:6868/toystore/products', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });

        onSave(response.data.product);
        await handleAlert({
          title: "Producto agregado",
          text: "El producto se ha añadido correctamente.",
          icon: "success",
        });
        handleRedirect('/dashboard');
      } catch (error) {
        await handleAlert({
          title: "Error",
          text: "Ocurrió un error al crear el producto. Por favor, intenta de nuevo.",
          icon: "error",
        });
        console.error('Error al crear el producto:', error);
      }
    },
  });

  const handleFileSelect = (index) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click();
    }
  };

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...formik.values.images];
      newImages[index] = file;
      formik.setFieldValue('images', newImages);
    }
  };

  const categoryOptions = categories.map((category) => ({
    value: category.name,
    label: category.name,
  }));

  return (
    <div className="modal-container">
      <div className="modal add-product-modal">
        <button className="close-button" onClick={onClose}>×</button>
        <form onSubmit={formik.handleSubmit} encType="multipart/formdata">
          <div className="modal-content">
            <div className="modal-left">
              <h3>Imágenes</h3>
              <div className="image-list">
                {formik.values.images.map((image, index) => (
                  <div className="image-item" key={index}>
                    {image ? (
                      <img src={URL.createObjectURL(image)} alt={`Producto ${index}`} />
                    ) : (
                      <div className="image-placeholder">Imagen</div>
                    )}
                    <button
                      className="modify-button"
                      type="button"
                      onClick={() => handleFileSelect(index)}
                    >
                      {image ? 'Modificar' : 'Agregar'}
                    </button>
                    <input
                      type="file"
                      style={{ display: 'none' }}
                      ref={(el) => (fileInputRefs.current[index] = el)}
                      onChange={(event) => handleFileChange(event, index)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="modal-right">
              <div className="form-group">
                <label htmlFor="name">Nombre:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.name && formik.touched.name && (
                  <div className="error-message">{formik.errors.name}</div>
                )}
              </div>
              <div className="form-group">
                <label htmlFor="description">Descripción:</label>
                <textarea
                  id="description"
                  name="description"
                  value={formik.values.description}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.errors.description && formik.touched.description && (
                  <div className="error-message">{formik.errors.description}</div>
                )}
              </div>
              <div className="form-group-inline">
                <div className="form-group">
                  <label htmlFor="quantity">Cantidad:</label>
                  <input
                    type="number"
                    id="quantity"
                    name="quantity"
                    min="1"
                    value={formik.values.quantity}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.quantity && formik.touched.quantity && (
                    <div className="error-message">{formik.errors.quantity}</div>
                  )}
                </div>
                <div className="form-group">
                  <label htmlFor="price">Precio:</label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    min="1"
                    step="0.01"
                    value={formik.values.price}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                  />
                  {formik.errors.price && formik.touched.price && (
                    <div className="error-message">{formik.errors.price}</div>
                  )}
                </div>
              </div>
              <div className="form-group">
                <label htmlFor="categories">Categoría:</label>
                <Select
                  id="categories"
                  options={categoryOptions}
                  value={categoryOptions.find(option => option.value === formik.values.categories[0])}
                  onChange={(selectedOption) =>
                    formik.setFieldValue('categories', [selectedOption.value])
                  }
                  onBlur={() => formik.setFieldTouched('categories', true)}
                />
                {formik.errors.categories && formik.touched.categories && (
                  <div className="error-message">{formik.errors.categories}</div>
                )}
              </div>
              <div className="modal-buttons">
                <button
                  className="cancel-button"
                  type="button"
                  onClick={onClose}
                >
                  Cancelar
                </button>
                <button className="save-button" type="submit">
                  Guardar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
      {alert}
    </div>
  );
};

export default AddProductModal;
