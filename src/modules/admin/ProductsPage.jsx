import { Button, Tooltip } from 'flowbite-react';
import React, { useMemo, useState, useEffect } from 'react';
import { HiPlus, HiOutlinePencilSquare } from "react-icons/hi2";
import CustomDataTable from '../../components/shared/CustomDataTable';
import SearchEngine from '../../components/Elements/Generales/SearchEngine';
import EditProductModal from '../../components/Admin/EditProductModal';
import AddProductModal from '../../components/Admin/AddProductModal'; 
import './../../assets/Pages/admin_pages/ProductsPage.scss';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const ProductsPage = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [editProduct, setEditProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); 
  const location = useLocation();

  useEffect(() => {
    const fetchProducts = async () => {
      const queryParams = new URLSearchParams(location.search);
      const categoryId = queryParams.get('category');
      try {
        setLoading(true);
        const response = await axios.get(`http://localhost:6868/toystore/products/category/${categoryId}`);
        if (response.data.message === 'No se encontraron productos para esta categoría') {
          setProducts([]);
        } else {
          setProducts(response.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [location.search]);

  const columns = useMemo(() => [
    {
      name: 'Nombre del producto',
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: 'Descripción del producto',
      selector: (row) => row.description,
      sortable: true,
    },
    {
      name: 'Stock',
      selector: (row) => row.stock,
      sortable: true,
    },
    {
      name: 'Acciones',
      cell: (row) => (
        <Button onClick={() => handleEdit(row)} className='edit-button'>
          <HiOutlinePencilSquare />
        </Button>
      ),
    },
  ], []);

  const handleEdit = async (product) => {
    try {
      const response = await axios.get(`http://localhost:6868/toystore/products/${product.product_id}`);
      setEditProduct(response.data);
    } catch (error) {
      console.error('Error fetching product details:', error);
    }
  };

  const handleCloseEditModal = () => {
    setEditProduct(null);
  };

  const handleSaveProduct = async (updatedProduct) => {
    try {
        const formData = new FormData();
        formData.append('name', updatedProduct.name);
        formData.append('description', updatedProduct.description);
        formData.append('price', updatedProduct.price);
        formData.append('category_id', updatedProduct.category_id);
        formData.append('stock', updatedProduct.stock);

        // Añadir las imágenes al FormData
        if (updatedProduct.images && updatedProduct.images.length > 0) {
            updatedProduct.images.forEach((image, index) => {
                if (image) {
                    formData.append('images', image);
                }
            });
        }

        await axios.put(`http://localhost:6868/toystore/products/${updatedProduct.product_id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            },
        });

        setProducts(products.map(product => product.product_id === updatedProduct.product_id ? updatedProduct : product));
        handleCloseEditModal();
    } catch (error) {
        console.error('Error updating product:', error);
    }
};

  const handleAddProduct = () => {
    setIsAddModalOpen(true);
  };

  const handleCloseAddModal = () => {
    setIsAddModalOpen(false); 
  };

  const handleSaveNewProduct = (newProduct) => {
    setProducts([...products, newProduct]);
    handleCloseAddModal();
  };

  return (
    <div className="products-page">
      <div className="top-content">
        <div className="content-search">
          <SearchEngine />
        </div>
        <Button className="add-button" onClick={handleAddProduct}>
          <HiPlus/>
        </Button>
      </div>

      <CustomDataTable columns={columns} data={products} isLoading={loading} />

      {editProduct && (
        <EditProductModal
          product={editProduct}
          categories={['Electronicos', 'De mesa', 'Educativos', 'Exteriores', 'Construcción','Peluches']}
          onClose={handleCloseEditModal}
          onSave={handleSaveProduct}
        />
      )}

      {isAddModalOpen && (
        <AddProductModal
          categories={['Electronicos', 'De mesa', 'Educativos', 'Exteriores', 'Construcción','Peluches']}
          onClose={handleCloseAddModal}
          onSave={handleSaveNewProduct}
        />
      )}
    </div>
  );
};

export default ProductsPage;
