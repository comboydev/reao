
import { useRef, useEffect, useState } from "react"
import { Modal, Button, message, Upload } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import CustomIcon from 'components/util-components/CustomIcon'
import { ImageSvg } from 'assets/svg/icon';
import { create } from "ipfs-http-client";

const { Dragger } = Upload;

const client = create("https://ipfs.infura.io:5001/api/v0");


const UploadImageModal = ({title, isModalVisible, handleCancel, handleOk, loading}) => {

  const isMountedRef = useRef(true);
  const [imageUri, setImageUri] = useState('');
  const [submit_ipfs, setSubmitIPFS] = useState(false);

  useEffect(()=>{
    isMountedRef.current = false;
    return () => {
      isMountedRef.current = true
    }
  }, [])


  const imageUploadProps = {
		name: 'file',
		listType: "picture-card",
		showUploadList: false,
		maxCount: 5,
		customRequest: () => {
			console.log('custom request');
		},

    beforeUpload: file => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
      }
      const isLt2M = file.size / 1024 / 1024 < 5;
      if (!isLt2M) {
        message.error('Image must smaller than 5MB!');
      }
      return isJpgOrPng && isLt2M;
    },

    onChange: info => {
      setSubmitIPFS(true);
      client.add(info.file.originFileObj).then(res =>{
        if(isMountedRef.current) return;
        setSubmitIPFS(false);
        const preUrl = `https://ipfs.io/ipfs/${res.path}`;
        setImageUri(preUrl);
      })
      .catch(err => {
        setSubmitIPFS(false);
        message.error("IPFSの接続を確認してください。");
      })
    },
	}



  return(
    <Modal title={title} 
      visible={isModalVisible} 
      onCancel={handleCancel}
      okText = {'Upload'}
      footer={[
        <Button key="submit" type="primary" 
          loading={loading} 
          disabled = {!imageUri}
          onClick={() => handleOk(imageUri)}
        >
          Upload
        </Button>
      ]}
    >
    	<Dragger 
        {...imageUploadProps} 
      >
        { submit_ipfs 
          ? <div>
              <CustomIcon className="display-3" svg={ImageSvg}/>
              <LoadingOutlined className="d-block mt-2"/> 
            </div>
          : (
              imageUri ? 
              <img src={imageUri} alt="avatar" className="img-fluid" /> 
              : 
              <div>
                <CustomIcon className="display-3" svg={ImageSvg}/>
                <p>Click or drag coin image to upload</p>
              </div>
          )
        }
      </Dragger>
    </Modal>
  );
}


export default UploadImageModal;