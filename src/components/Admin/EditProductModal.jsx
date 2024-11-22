import React, { useRef } from 'react';
import Select from 'react-select';
import './../../assets/Components/general/Modal.scss';
import { useFormik } from 'formik';
import * as yup from 'yup';

const EditProductModal = ({ product, categories, onClose, onSave }) => {
  const fileInputRefs = useRef([]);

  const handleFileSelect = (index) => {
    if (fileInputRefs.current[index]) {
      fileInputRefs.current[index].click();
    }
  };

  const handleFileChange = (event, index) => {
    const file = event.target.files[0];
    if (file) {
      const newImages = [...formik.values.images];
      newImages[index] = URL.createObjectURL(file);
      formik.setFieldValue('images', newImages);
    }
  };

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
      .test('all-images-present', 'Debes subir las 5 imágenes', (value) =>
        value.every((image) => image !== null)
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: product.name,
      description: product.description,
      quantity: product.quantity,
      price: product.price,
      categories: product.categories.map((cat) => cat),
      images: product.images,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      onSave(values);
    },
  });

  const categoryOptions = categories.map((category) => ({
    value: category,
    label: category,
  }));

  return (
    <div className="modal-container">
      <div className="modal edit-product-modal">
        <button className="close-button" onClick={onClose}>
          ×
        </button>
        <form onSubmit={formik.handleSubmit}>
          <div className="modal-content">
            <div className="modal-left">
              <h3>Imágenes</h3>
              <div className="image-list">
                {formik.values.images.map((image, index) => (
                  <div className="image-item" key={index}>
                    {image ? (
                      <img src={image} alt={`Producto ${index}`} />
                    ) : (
                      <div className="image-placeholder">Espacio para imagen</div>
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
              {formik.errors.images && formik.touched.images && (
                <div className="error-message">{formik.errors.images}</div>
              )}
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
                <label htmlFor="categories">Categorías:</label>
                <Select
                  id="categories"
                  isMulti
                  options={categoryOptions}
                  value={formik.values.categories.map((cat) => ({
                    value: cat,
                    label: cat,
                  }))}
                  onChange={(selectedOptions) =>
                    formik.setFieldValue(
                      'categories',
                      selectedOptions.map((option) => option.value)
                    )
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
                  Actualizar
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProductModal;
