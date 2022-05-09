import React, { useState, useEffect } from "react";
import { Link, useHistory } from "react-router-dom";
import { Steps } from 'antd';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import moment from "moment";
import { Modal, Button, Image, message, Popconfirm } from "antd";
import { ExclamationCircleOutlined, EditOutlined } from '@ant-design/icons';
import { required, is_phoneNumber } from "services/validator";
import Loading from "components/shared-components/Loading";
import UploadImageModal from "views-user/components/uploadImageModal.component";
import provinces from "./province.json";
import UserService from "services/user.service";
const { confirm } = Modal;
const { Step } = Steps;


const PersonalInfo = () => {

  var form, checkBtn;
  const currentUser =  UserService.getCurrentUser();
  const history = useHistory();

  const [user, setUser] = useState();

  const [nickname, setNickName] = useState('');
  const [name, setName] = useState('');
  const [furigana, setFurigana] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [birthday, setBirthday] = useState('');
  const [locationProvince, setLocationProvince] = useState('');
  const [locationCity, setLocationCity] = useState('');
  const [extra, setExtra] = useState('');

  const [enableButton, setEnableButton] = useState(false);
  const [enbaleIDButton, setEnableIDButton] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [submit_id, setSubmitID] = useState(false);
  const [submit_avatar, setSubmitAvatar] = useState(false);
  const [submit_warrant, setSubmitWarrant] = useState(false);
  const [loaded, setLoaded] = useState(false);
  const [showAvatarUploadModal, setShowAvatarUploadModal] = useState(false);
  const [showWarrantUploadModal, setShowWarrantUploadModal] = useState(false);
  
  useEffect(()=>{
    setLoaded(false);
    UserService.getPersonalInfo(currentUser._id)
    .then((res)=>{
      setLoaded(true);
      let new_user = res.data;
      UserService.setCurrentUser(new_user);
      setUser(new_user);
      setNickName(new_user.nickname);
      if(new_user && new_user.personalInfo){
        setName(new_user.personalInfo.name);
        setFurigana(new_user.personalInfo.furigana);
        setPhoneNumber(new_user.personalInfo.phoneNumber);
        setBirthday(moment(new_user.personalInfo.birthday).format("YYYY-MM-DD"));
        setLocationProvince(new_user.personalInfo.locationProvince || '北海道');
        setLocationCity(new_user.personalInfo.locationCity);
        setExtra(new_user.personalInfo.extra);
      }
    })
    .catch(err=>{
      setLoaded(true);
      message.error("エラーか発生しました。", ()=>{
        history.push('/mypage');
      });
    })
  },[])

  useEffect(()=>{
    setEnableButton(false);
    let currentUser = UserService.getCurrentUser();
    if(currentUser){
      if(name === currentUser.personalInfo?.name
        && furigana === currentUser.personalInfo?.furigana
        && phoneNumber === currentUser.personalInfo?.phoneNumber
        && birthday === moment(currentUser.personalInfo?.birthday).format("YYYY-MM-DD")
        && locationProvince === currentUser.personalInfo?.locationProvince  
        && locationCity === currentUser.personalInfo?.locationCity
        && extra === currentUser.personalInfo?.extra
      ) {
        setEnableButton(false);
      } else { 
        setEnableButton(true) 
      }
    }
  }, [name, furigana, phoneNumber, birthday, locationProvince, locationCity, extra])


  useEffect(()=>{
    setEnableIDButton(false);
    let currentUser = UserService.getCurrentUser();
    if(currentUser){
      if(nickname === currentUser.nickname){
        setEnableIDButton(false);
      } else {
        setEnableIDButton(true);
      }
    }
  }, [nickname])


  const handleSubmit = () => {
    const personalObject = {
      id: user._id,
      name: name,
      furigana: furigana,
      phoneNumber: phoneNumber,
      birthday: birthday,
      locationProvince: locationProvince,
      locationCity: locationCity,
      extra: extra,
    };

    setSubmit(true);
    UserService.updatePersonalInfo(personalObject)
    .then((res) => {
      setSubmit(false);
      UserService.setCurrentUser(res.data);
      setUser(res.data);
      setEnableButton(false);
      message.success("アップロードしました。");
    })
    .catch(error => {
      setSubmit(false); 
      message.error("失敗しました。");
    })
  }


  const onChangeNickname = (e) => {
    e.preventDefault();
    let user = UserService.getCurrentUser();
    let obj = {
      id: user._id,
      nickname: nickname
    }
    setSubmitID(true);
    UserService.updateNickname(obj)
    .then(res => {
      setSubmitID(false);
      setEnableIDButton(false);
      message.success("ニック名を変更しました。")
      UserService.setCurrentUser(res.data);
      setUser(res.data);
    })
    .catch(err => {
      setSubmitID(false);
      message.error("失敗しました。");
    })
  }

  const onChangeAvatar = (uri) => {
    if(!uri){
      message.warning("画像を選択する必要があります。");
      return;
    }
    let user = UserService.getCurrentUser();
    let obj = {
      id: user._id,
      avatar: uri
    }
    setSubmitAvatar(true);
    UserService.updateUserAvatar(obj)
    .then(res => {
      setSubmitAvatar(false);
      UserService.setCurrentUser(res.data);
      setUser(res.data);
      message.success("Avatarを変更しました。")
      window.location.reload();
    })
    .catch(err => {
      setSubmitAvatar(false);
      message.error("失敗しました。");
    })
  }

  const onChangeWarrant = (uri) => {
    if(!uri){
      message.warning("身分証を選択する必要があります。");
      return;
    }
    let user = UserService.getCurrentUser();
    let obj = {
      id: user._id,
      warrant: uri
    }
    setSubmitWarrant(true);
    UserService.updateUserWarrant(obj)
    .then(res => {
      setSubmitWarrant(false);
      UserService.setCurrentUser(res.data);
      setUser(res.data);
      message.success("身分証を登録しました。\n本人確認申請しました。")
      setShowWarrantUploadModal(false);
    })
    .catch(err => {
      setSubmitAvatar(false);
      message.error("失敗しました。");
    })
  }


  const showConfirm = (e) => {
    e.preventDefault();

    form.validateAll();
    if (checkBtn.context._errors.length > 0)
    return;

    confirm({
      title: 'Caution',
      icon: <ExclamationCircleOutlined />,
      content: "本人確認済みの場合本人確認が解除されることがあります。\n大丈夫ですか？",
      onOk() {
        handleSubmit();
      },
      onCancel() {
        console.log('Cancel');
      },
    });
  }

  const deleteUser = () => {
    let user = UserService.getCurrentUser();
    UserService.withdrawal(user._id)
    .then(res => {
      UserService.logout();
      message.success("退会しました！", ()=>{
        window.location.href="/"
      });
    })
    .catch(err => {
      message.error("失敗しました。");
    })
  }


  if(!loaded || !user) return <Loading cover="page"/>
  return (
    <div className="c-memberInfo">
      <section className="p-card">
        <div className="c-header mb-4">
          <h3 className="c-header--title">個人情報登録</h3>
          <p className="c-header--subtitle">Personal Information Management</p>
        </div>
        <div className="my-20 max-w750 mx-auto">
          <Steps  current={user.identityVerified < 1 ? user.identityVerified + 1 : 3}>
            <Step title="Application" description="本人確認書類提出" />
            <Step title="Waiting" description="申請中" />
            <Step title="Complete" description="本人確認完了" />
          </Steps>
        </div>
        <div className="c-card text-left">
          <div className="c-memberInfo__profile">
            <div className="c-memberInfo__profile-header">
              コレクタープロフィール
            </div>
            <div className="c-memberInfo__profile-container my-4">
              <div className="c-memberInfo__profile-avatar position-relative">
                <img src={user.avatar} alt="avatar" className="border w-100 h-100"/>
                <Button 
                  type="primary" shape="circle" 
                  icon={<EditOutlined />} 
                  style={{ 
                    position: 'absolute',
                    bottom: 8,
                    right: 8
                  }}
                  onClick = {()=> setShowAvatarUploadModal(true)}
                  />
                <UploadImageModal 
                  title = {"Edit Avatar"}
                  isModalVisible = {showAvatarUploadModal} 
                  handleCancel = {()=>{
                    setShowAvatarUploadModal(false);
                  }}
                  loading = {submit_avatar}
                  handleOk = {onChangeAvatar}
                />
              </div>
              <div>
                <div className="c-memberInfo__profile-name">
                  {
                    user.identityVerified === -1 && <div className="tag bg-danger">本人確認未</div>
                  }
                  {
                    user.identityVerified === 0 && <div className="tag bg-primary">申請中</div>
                  }
                  {
                    user.identityVerified === 1 && <div className="tag bg-success">本人確認完了</div>
                  }
                </div>
                <div className="c-memberInfo__profile-text">
                  <p>
                    アップロード可能なサイズは「JPEG・JPG・GIF・PNG」
                    ファイルのサイズは7MB以内です。
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div className="c-memberInfo__form">
            <Form 
              onSubmit={onChangeNickname}
              >
              <div className="c-form--item">
                <label htmlFor="id">ニック名</label>
                <Input
                  type="text"
                  id = "id"
                  className="c-form--input"
                  value={nickname || ''}
                  onChange={(e)=>setNickName(e.target.value)}
                />
              </div>
              <Button type="primary" 
                htmlType="submit" 
                className="c-btn c-btn--memberInfo mb-5"
                disabled = {!enbaleIDButton}
                loading={submit_id}>
                <span>ニック名を変更</span>
              </Button>
            </Form>
            <Form
              onSubmit={showConfirm}
              ref={c => {
                form = c;
              }}
            >
              <div className="c-form--item">
                <label htmlFor="name">お名前</label>
                <Input
                  type="text"
                  id="name"
                  className="c-form--input"
                  value={name || ''}
                  onChange={(e)=>setName(e.target.value)}
                  validations={[required]}
                  placeholder = "例）鈴木　一郎"
                />
              </div>
              <div className="c-form--item">
                <label htmlFor="furigana">フリガナ</label>
                <Input
                  type="text"
                  id="furigana"
                  className="c-form--input"
                  value={furigana || ''}
                  onChange={(e)=>setFurigana(e.target.value)}
                  validations={[required]}
                  placeholder="例）スズキ　イチロウ"
                />
                <label className="pl-md-3 text-left">※全角カタカナ</label>
              </div>
              <div className="c-form--item">
                <label htmlFor="phone">電話番号</label>
                <Input
                  type="text"
                  id="phone"
                  className="c-form--input"
                  value={phoneNumber || ''}
                  onChange={(e)=>setPhoneNumber(e.target.value)}
                  validations={[required, is_phoneNumber]}
                  placeholder = "例）0123456789"
                />
              </div>
              <div className="c-form--item">
                <label htmlFor="birthday">生年月日</label>
                <Input
                  type="date"
                  id="birthday"
                  className="c-form--input"
                  value={birthday}
                  onChange={(e)=>setBirthday(e.target.value)}
                  validations={[required]}
                />
              </div>
              <div className="c-form--item">
                <label htmlFor="province">都道府県</label>
                <select 
                  id="province"
                  className="c-form--input"
                  onChange={e=>setLocationProvince(e.target.value)}
                  value = {locationProvince}
                >
                  {
                    provinces.map((item, index) => 
                      <option key={index} value={item.name}>{item.name}</option>
                    )
                  }
                </select>
              </div>
              <div className="c-form--item">
                <label htmlFor="city">市区町村</label>
                <Input
                  id="city"
                  type="text"
                  className="c-form--input"
                  value={locationCity || ''}
                  onChange={(e)=>setLocationCity(e.target.value)}
                  validations={[required]}
                />
              </div>
              <div className="c-form--item">
                <label htmlFor="extra">それ以降の住所</label>
                <Input
                  id="extra"
                  type="text"
                  className="c-form--input"
                  value={extra || ''}
                  onChange={(e)=>setExtra(e.target.value)}
                  validations={[required]}
                />
              </div>
              
              <Button type="primary" 
                htmlType="submit" 
                className="c-btn c-btn--memberInfo my-5"
                disabled = {!enableButton}
                loading={submit}>
                <span>内容を送信する</span>
              </Button>

              <CheckButton
                style={{ display: "none" }}
                ref={c => {
                  checkBtn = c;
                }}
              />
            </Form>
            
            <div className="c-memberInfo__status">
              <div className="c-memberInfo__status--item">
                <div className="c-memberInfo__status--item-header">
                  パスワード
                </div>
                <div>
                  <Link to="/profile/change-password" style={{ fontSize: 15, color: '#A78754' }}>パスワードを変更</Link>
                </div>
              </div>
              <div className="c-memberInfo__status--item">
                <div className="c-memberInfo__status--item-header">
                  会員ステータス
                </div>
                <div>
                  一般会員
                </div>
              </div>
            </div>
            <Popconfirm
                title="本当に退会しますか？"
                onConfirm={deleteUser}
                okText="YES"
                cancelText="NO"
              > 
              <p className="c-form--link text-left d-inline-block" style={{ cursor:'pointer' }}>ユーザー退会</p>
            </Popconfirm>
          </div>
        </div>
      </section>
      
      <section className="p-card">

        <div className="c-header mb-4">
          <h3 className="c-header--title">本人認証</h3>
          <p className="c-header--subtitle">Identity Authentication</p>
        </div>

        <div className="c-card text-center">
          <h2 className="line-height-2">
            オーナー権の売却には、本人認証が必要です。<br className="pc-onlyt"/>
            こちらから本人認証を完了させてください。
          </h2>

          <Button type="primary" 
            className="c-btn c-btn--memberInfo mt-4"
            style={{ maxWidth: 350 }}
            disabled = { user.identityVerified === 1 }
            onClick={()=>
              setShowWarrantUploadModal(true)
            } >
            本人確認をする
          </Button>

          <UploadImageModal 
            title = {"身分証明書登録"}
            isModalVisible = {showWarrantUploadModal} 
            handleCancel = {()=>{
              setShowWarrantUploadModal(false);
            }}
            loading = {submit_warrant}
            handleOk = {onChangeWarrant}
          />
        </div>

        {/* <div className="c-card text-center mt-5">
          <h1 className="c-memberInfo__profile-header">二段階認証</h1>
          <h2 className="line-height-2 mt-4">
            二段階認証が設定されていません。<br className="pc-onlyt"/> 
            二段階認証はパスワードと電話番号でアカウントを保護します。
          </h2>
          <Button type="primary" 
            className="c-btn c-btn--memberInfo mt-4"
            style={{ maxWidth: 350 }}>
            二段階認証を設定する
          </Button>
        </div> */}
      </section>
    </div>
  );
}


export default PersonalInfo;