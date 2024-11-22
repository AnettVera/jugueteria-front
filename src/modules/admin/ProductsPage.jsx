import { Button, Tooltip } from 'flowbite-react';
import React, { useMemo, useState } from 'react';
import { HiPlus, HiOutlinePencilSquare } from "react-icons/hi2";
import CustomDataTable from '../../components/shared/CustomDataTable';
import SearchEngine from '../../components/Elements/Generales/SearchEngine';
import EditProductModal from '../../components/Admin/EditProductModal';
import AddProductModal from '../../components/Admin/AddProductModal'; 
import './../../assets/Pages/admin_pages/ProductsPage.scss';

const ProductsPage = () => {
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([
    {
      id: 1,
      productName: 'Juguete A',
      productDescription: 'Un juguete divertido para niños.',
      stock: 50,
      images: ['https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcSQ4i2X-G487wY2XnnlCLxMrUyq-GDhpi5nBGciWdA3xalfo0OFmu3Sg5ENaMSdiAFoLRnO28UfxMNkfChg0bUGgkpPiA1Cgrq4EKlEpw4OIew04rQs00DZ9RnSpeCeGPi2UMyvMw&usqp=CAc'],
      quantity: 50,
      price: 100,
      categories: ['Peluches'],
    },
    {
      id: 2,
      productName: 'Juguete B',
      productDescription: 'Un juguete educativo.',
      stock: 30,
      images: ['https://encrypted-tbn2.gstatic.com/shopping?q=tbn:ANd9GcTAyiYUi-R6YYUaR9Vb3jUXUk9LN0GyMa4iE3t_fQ7puiyZv-fUCaID88HD_LM2ZHNZoO7yEaRFX9EyDK5Gh1EYHpbMsvz3e4muj1wfZ4qRaMmR0OqjFKDSyaUHSn3mJRTnfWSOg1Lfyg&usqp=CAc'],
      quantity: 30,
      price: 200,
      categories: ['Educativos', 'De mesa'],
    },
  ]);
  const [editProduct, setEditProduct] = useState(null);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false); 

  const columns = useMemo(() => [
    {
      name: 'Nombre del producto',
      selector: (row) => row.productName,
      sortable: true,
    },
    {
      name: 'Descripción del producto',
      selector: (row) => row.productDescription,
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

  const handleEdit = (product) => {
    setEditProduct(product);
  };

  const handleCloseEditModal = () => {
    setEditProduct(null);
  };

  const handleSaveProduct = () => {
    console.log('Guardando producto...');
    handleCloseEditModal();
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
