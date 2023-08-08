import React, { Fragment, useEffect, useState } from 'react'
import Carousel from 'react-material-ui-carousel'
import './ProductDetails.css'
import { useSelector,useDispatch } from 'react-redux'
import { clearErrors, getProductDetails } from '../../actions/productAction'
import { useParams } from 'react-router'
import { Rating } from '@material-ui/lab'
// import { Rating } from '@mui/material';
import ReviewCard from './ReviewCard'
import Loader from '../layout/Loader/Loader'
import {useAlert} from 'react-alert'
import MetaData from '../layout/MetaData'

const ProductDetails = () => {

    const dispatch = useDispatch();
    const alert = useAlert();

    const {id} = useParams();

    const {product,loading,error} = useSelector((state)=>state.productDetails);

    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        if(error){
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProductDetails(id))
    },[alert,dispatch,error,id])
    
    if(!product)
        return (<div>
            null
        </div>) ;

    
    const options = {
        size: "large",
        value: product.ratings,
        readOnly: true,
        precision: 0.5,
    };


    const increaseQuantity = ()=>{

        if(product.Stock <= quantity)
            return;

        const qty = quantity + 1;
        setQuantity(qty);
    }

    const decreaseQuantity = () => {
        if(quantity <= 1)
            return;

        const qty = quantity - 1;
        setQuantity(qty);
    };



  return (
    <Fragment>
        {loading?<Loader/>:(
            <Fragment>
                <MetaData title={`${product.name} -- ECOMMERCE`} />
                <div className='ProductDetails'> 
                    <div>
                        <Carousel>
                            {product&& product.images && product.images.map((item,i)=>(
                                <img
                                    key={item.url}
                                    className='CarouselImage'
                                    src={item.url}
                                    alt={`${i} Slide`}
                                />
                            ))}
                        </Carousel>
                    </div>
                            
                    <div>
                        <div className='detailsBlock-1'>
                            <h2>{product.name}</h2>
                            <p>Product # {product._id}</p>     
                        </div>
                        <div className='detailsBlock-2'>
                            <Rating {...options} />
                            
                            <span> ({product.numOfReviews} Reviews) </span>        
                        </div>
                        <div className='detailsBlock-3'>
                            <h1> {`Rs. ${product.price}`} </h1>   
                            <div className='detailsBlock-3-1'>
                                <div className='detailsBlock-3-1-1'>
                                    <button onClick={decreaseQuantity}>-</button>
                                    <input readOnly type="number" value={quantity}/>
                                    <button onClick={increaseQuantity}>+</button>
                                </div>{" "}
                                <button>Add to Cart</button>
                            </div> 
                            <p>
                                Status:{" "}
                                <b className={product.Stock<1?"redColor":"greenColor"}>
                                    {product.Stock<1?"OutOfStock":"InStock"}
                                </b>
                            </p> 
                        </div>
                        <div className='detailsBlock-4'>
                            Description : <p>{product.description}</p>
                        </div>
                        <button className='submitReview'>Submit Review</button>
                    </div>
                </div>
                <h3 className='reviewsHeading'>REVIEWS</h3>
                {product.reviews && product.reviews[0]?(
                    <div className='reviews'>
                        {product.reviews && product.reviews.map((review)=><ReviewCard review={review}/>)}
                    </div>
                ):(
                    <p className='noReviews'>No Reviews Yet</p>
                )}

            </Fragment>
        )}
    </Fragment>
  );
};

export default ProductDetails
