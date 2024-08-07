import {useState,useCallback} from 'react';
import PropTypes from 'prop-types';
import {PlusOutlined} from '@ant-design/icons';
import ImagesZoom from './ImagesZoom'

const PostImages = ({images}) =>{
    const [showImagesZoom,setShowImagesZoom] = useState(false);

    const onZoom = useCallback(()=>{
        setShowImagesZoom(true);
    },[]);
    const onClose = useCallback(()=>{
        setShowImagesZoom(false);
    })

    if(images.length === 1){
        return (
            <>
                <img src={images[0].src} alt={images[0].src} onClick={onZoom}/>
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose}/>}
            </>
        )
    }
    if(images.length === 2){
        return (
            <div>
                <div style={{display:'flex'}}>
                    <img src={images[0].src} style={{width:"50%"}} alt={images[0].src} onClick={onZoom}/>
                    <img src={images[1].src} style={{width:"50%"}} alt={images[1].src} onClick={onZoom}/>
                </div>
                {showImagesZoom && <ImagesZoom images={images} onClose={onClose}/>}
            </div>
        )
    }
    //3개이상이면
    return(
        <>
            <img src={images[0].src} style={{width:"50%"}} alt={images[0].src} onClick={onZoom}/>
            <div 
            style={{dispaly:'inline-block',textAlign:'center',verticalAlign:'middle'}} 
            onClick={onZoom}>
                <PlusOutlined /><br/>
                {images.length - 1}개의 사진 더보기
            </div>
            {showImagesZoom && <ImagesZoom images={images} onClose={onClose}/>}
        </>
    )    
}

PostImages.propTypes = {
    images:PropTypes.arrayOf(PropTypes.object)
}

export default PostImages;