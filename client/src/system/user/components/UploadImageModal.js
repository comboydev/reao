
import { useRef, useEffect, useState } from "react"
import { Modal, message, Upload } from "antd";
import { LoadingOutlined } from '@ant-design/icons';
import CustomIcon from 'components/util-components/CustomIcon'
import { ImageSvg } from 'assets/svg/icon';
import ImageService, { imageUri } from "services/image";

const { Dragger } = Upload;

const UploadImageModal = ({ title, isModalVisible, handleCancel, handleOk, loading }) => {

  const isMountedRef = useRef(true);
  const [image, setImage] = useState('');
  const [submit, setSubmit] = useState(false);

  useEffect(() => {
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
    customRequest: (e) => {
      setSubmit(true);
      ImageService.getBase64(e.file, async (base64) => {
        const { data } = await ImageService.upload(base64);
        setImage(data.uri);
        setSubmit(false);
      })
    },
  }

  return (
    <Modal title={title}
      visible={isModalVisible}
      onCancel={handleCancel}
      okText={'Upload'}
      okButtonProps={{
        loading: loading,
        disabled: !image,
        className: 'd-inline-flex align-items-center justify-content-center'
      }}
      onOk={() => handleOk(image)}
    >
      <Dragger
        {...imageUploadProps}
      >
        {submit
          ? <div>
            <CustomIcon className="display-3" svg={ImageSvg} />
            <LoadingOutlined className="d-block mt-2" />
          </div>
          : (
            image ?
              <img src={imageUri(image)} alt="avatar" className="img-fluid" />
              :
              <div>
                <CustomIcon className="display-3" svg={ImageSvg} />
                <p>Click or drag coin image to upload</p>
              </div>
          )
        }
      </Dragger>
    </Modal>
  );
}


export default UploadImageModal;