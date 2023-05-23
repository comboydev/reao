import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Steps, Avatar } from 'antd';
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";
import moment from "moment";
import { Modal, Button, message, Popconfirm } from "antd";
import { ExclamationCircleOutlined, EditOutlined, UserOutlined } from '@ant-design/icons';
import { required, is_phoneNumber } from "plugins/validator";
import UploadImageModal from 'system/user/components/UploadImageModal';
import prefs from './prefs.json';
import { connect } from 'react-redux';
import { setUser, signOut } from "redux/actions";
import api from 'api';
import { imageUri } from "services/image";

const { confirm } = Modal;
const { Step } = Steps;

const PersonalInfo = ({ user, setUser, signOut }) => {
  var form, checkBtn;

  const [nickname, setNickName] = useState(user.nickname);
  const [name, setName] = useState(user?.personalInfo?.name);
  const [furigana, setFurigana] = useState(user?.personalInfo?.furigana);
  const [phoneNumber, setPhoneNumber] = useState(user?.personalInfo?.phoneNumber);
  const [birthday, setBirthday] = useState(moment(user?.personalInfo?.birthday).format("YYYY-MM-DD"));
  const [locationProvince, setLocationProvince] = useState(user?.personalInfo?.locationProvince || '北海道');
  const [locationCity, setLocationCity] = useState(user?.personalInfo?.locationCity);
  const [extra, setExtra] = useState(user?.personalInfo?.extra);

  const [enableButton, setEnableButton] = useState(false);
  const [enbaleIDButton, setEnableIDButton] = useState(false);
  const [submit, setSubmit] = useState(false);
  const [submitingId, setSubmitID] = useState(false);
  const [submitingAvatar, setSubmitAvatar] = useState(false);
  const [submitingWarrant, setSubmitWarrant] = useState(false);
  const [showAvatarUploadModal, setShowAvatarUploadModal] = useState(false);
  const [showWarrantUploadModal, setShowWarrantUploadModal] = useState(false);

  useEffect(() => {
    setEnableButton(false);
    if (user) {
      if (name === user.personalInfo?.name
        && furigana === user.personalInfo?.furigana
        && phoneNumber === user.personalInfo?.phoneNumber
        && birthday === moment(user.personalInfo?.birthday).format("YYYY-MM-DD")
        && locationProvince === user.personalInfo?.locationProvince
        && locationCity === user.personalInfo?.locationCity
        && extra === user.personalInfo?.extra
      ) {
        setEnableButton(false);
      } else {
        setEnableButton(true)
      }
    }
  }, [user, name, furigana, phoneNumber, birthday, locationProvince, locationCity, extra])


  useEffect(() => {
    setEnableIDButton(false);
    if (user) {
      if (nickname === user.nickname) {
        setEnableIDButton(false);
      } else {
        setEnableIDButton(true);
      }
    }
  }, [nickname, user])


  const handleSubmit = async () => {
    const personalInfo = {
      name: name,
      furigana: furigana,
      phoneNumber: phoneNumber,
      birthday: birthday,
      locationProvince: locationProvince,
      locationCity: locationCity,
      extra: extra,
    };

    setSubmit(true);
    const { data } = await api.userProfile.updateUserInfo({ personalInfo })
    setSubmit(false);
    setEnableButton(false);
    setUser(data);
    message.success("アップロードしました。");
  }


  const onChangeNickname = async (e) => {
    e.preventDefault();
    setSubmitID(true);
    const { data } = await api.userProfile.updateNickname({ nickname })
    setSubmitID(false);
    setEnableIDButton(false);
    setUser(data);
    message.success("ユーザー名を変更しました。")
  }

  const onChangeAvatar = async (uri) => {
    if (!uri) {
      message.warning("画像を選択する必要があります。");
      return;
    }
    setSubmitAvatar(true);
    const { data } = await api.userProfile.updateAvatar({ avatar: uri })
    setSubmitAvatar(false);
    setUser(data);
    message.success("Avatarを変更しました。")
  }

  const onChangeWarrant = async (uri) => {
    if (!uri) {
      message.warning("身分証を選択する必要があります。");
      return;
    }
    setSubmitWarrant(true);
    const { data } = await api.userProfile.updateWarrant({ warrant: uri })
    setSubmitWarrant(false);
    setShowWarrantUploadModal(false);
    setUser(data);
    message.success("身分証を登録しました。\n本人確認申請しました。")
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
    });
  }

  const deleteUser = async () => {
    const { data } = await api.userProfile.withdraw()
    if (data.statusCode === 200) {
      signOut();
      message.success("退会しました！", () => {
        window.location.href = "/"
      });
    } else {
      message.warning(data.message);
    }
  }

  return (
    <div className="c-memberInfo">
      <section className="p-card">
        <div className="c-header">
          <h3 className="c-header--title">個人情報登録</h3>
          <p className="c-header--subtitle">Personal Information Management</p>
        </div>
        <div className="my-20 max-w750 mx-auto">
          <Steps current={user.identityVerified < 1 ? user.identityVerified + 1 : 3}>
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
                <Avatar src={imageUri(user.avatar)} size={150} icon={<UserOutlined />} />
                <Button
                  type="primary" shape="circle"
                  icon={<EditOutlined />}
                  style={{
                    position: 'absolute',
                    bottom: 8,
                    right: 8
                  }}
                  onClick={() => setShowAvatarUploadModal(true)}
                />
                <UploadImageModal
                  title={"Edit Avatar"}
                  isModalVisible={showAvatarUploadModal}
                  handleCancel={() => {
                    setShowAvatarUploadModal(false);
                  }}
                  loading={submitingAvatar}
                  handleOk={onChangeAvatar}
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
                <label htmlFor="id">ユーザー名</label>
                <Input
                  type="text"
                  id="id"
                  className="c-form--input"
                  value={nickname || ''}
                  onChange={(e) => setNickName(e.target.value)}
                />
              </div>
              <Button type="primary"
                htmlType="submit"
                className="c-btn c-btn--memberInfo mb-5"
                disabled={!enbaleIDButton}
                loading={submitingId}>
                <span>ユーザー名を変更</span>
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
                  onChange={(e) => setName(e.target.value)}
                  validations={[required]}
                  placeholder="例）鈴木　一郎"
                />
              </div>
              <div className="c-form--item">
                <label htmlFor="furigana">フリガナ</label>
                <Input
                  type="text"
                  id="furigana"
                  className="c-form--input"
                  value={furigana || ''}
                  onChange={(e) => setFurigana(e.target.value)}
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
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  validations={[required, is_phoneNumber]}
                  placeholder="例）0123456789"
                />
              </div>
              <div className="c-form--item">
                <label htmlFor="birthday">生年月日</label>
                <Input
                  type="date"
                  id="birthday"
                  className="c-form--input"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                  validations={[required]}
                />
              </div>
              <div className="c-form--item">
                <label htmlFor="province">都道府県</label>
                <select
                  id="province"
                  className="c-form--input"
                  onChange={e => setLocationProvince(e.target.value)}
                  value={locationProvince}
                >
                  {
                    prefs.map((item, index) =>
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
                  onChange={(e) => setLocationCity(e.target.value)}
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
                  onChange={(e) => setExtra(e.target.value)}
                  validations={[required]}
                />
              </div>

              <Button type="primary"
                htmlType="submit"
                className="c-btn c-btn--memberInfo my-5"
                disabled={!enableButton}
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
              <p className="c-form--link text-left d-inline-block" style={{ cursor: 'pointer' }}>ユーザー退会</p>
            </Popconfirm>
          </div>
        </div>
      </section>

      <section className="p-card">

        <div className="c-header">
          <h3 className="c-header--title">本人認証</h3>
          <p className="c-header--subtitle">Identity Authentication</p>
        </div>

        <div className="c-card text-center">
          <h2 className="line-height-2">
            オーナー権の売却には、本人認証が必要です。<br className="pc-onlyt" />
            こちらから本人認証を完了させてください。
          </h2>

          <Button type="primary"
            className="c-btn c-btn--memberInfo mt-4"
            style={{ maxWidth: 350 }}
            disabled={user.identityVerified === 1}
            onClick={() =>
              setShowWarrantUploadModal(true)
            } >
            本人確認をする
          </Button>

          <UploadImageModal
            title={"身分証明書登録"}
            isModalVisible={showWarrantUploadModal}
            handleCancel={() => {
              setShowWarrantUploadModal(false);
            }}
            loading={submitingWarrant}
            handleOk={onChangeWarrant}
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


export default connect(({ appStore }) => appStore, { setUser, signOut })(PersonalInfo);