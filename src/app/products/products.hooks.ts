import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import {
  addProduct,
  deleteProduct,
  editProduct,
  fetchProducts,
} from "@/store/slices/products/products.thunks";
import { FormikHelpers } from "formik";
import { addProductSchema } from "./products.schema";
import { addProductInitialValues } from "./products.utils";
import { CreateProduct } from "./products.types";

export function useProducts() {
  const dispatch = useDispatch<AppDispatch>();
  const { list } = useSelector((state: RootState) => state.products);
  const [showAddForm, setShowAddForm] = useState<boolean>(false);

  const handleShowAddForm = () => setShowAddForm(true);
  const handleCloseAddForm = () => setShowAddForm(false);

  const handleDelete = (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProduct(id));
    }
  };

  const handleEdit = (productId: string) => {
    const product = list.find((p) => p.id === productId);
    if (!product) return;

    const newName = prompt("Enter new product name:", product.name);
    if (newName && newName !== product.name) {
      dispatch(editProduct({ ...product, name: newName }));
    }
  };

  const formikConfig = {
    enableReinitialize: true,
    initialValues: addProductInitialValues,
    validationSchema: addProductSchema,
    onSubmit: (
      values: CreateProduct,
      { resetForm }: FormikHelpers<CreateProduct>
    ) => {
      dispatch(
        addProduct({
          values,
          onSuccess: () => {
            resetForm();
            setShowAddForm(false);
          },
        })
      );
    },
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return {
    products: list,
    showAddForm,
    formikConfig,
    handleShowAddForm,
    handleCloseAddForm,
    handleEdit,
    handleDelete,
  };
}
