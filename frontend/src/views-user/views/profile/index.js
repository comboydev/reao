import React, { Component, useState, useRef } from "react";
import { Link } from "react-router-dom";
import AuthService from "services/auth.service";
import Dropzone from "react-dropzone";
import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export default class PersonalInfo extends Component {
  constructor(props) {
    super(props);

    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangeFurigana = this.onChangeFurigana.bind(this);
    this.onChangePhoneNumber = this.onChangePhoneNumber.bind(this);
    //this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeBirthday = this.onChangeBirthday.bind(this);
    this.onChangeLocationProvince = this.onChangeLocationProvince.bind(this);
    this.onChangeLocationCity = this.onChangeLocationCity.bind(this);
    this.onChangeExtra = this.onChangeExtra.bind(this);
    this.submitPersonalInfo = this.submitPersonalInfo.bind(this);
    //this.onDrop = this.onDrop.bind(this);
    this.onDropID = this.onDropID.bind(this);
    this.updateBorder = this.updateBorder.bind(this);
    this.uploadImage = this.uploadImage.bind(this);
    this.onQuit = this.onQuit.bind(this);

    this.state = { currentUser: null, userReady: true, };
  }
  async componentDidMount() {
    let currentUser = AuthService.getCurrentUser();
    
    await axios.get(`${API_URL}/users/${currentUser.id}`)
    .then(
      response => {
        console.log('then',response.data)
        currentUser = response.data;
        AuthService.setCurrentUser(currentUser);
        
        this.setState({
          userReady: true,
    
          username: currentUser.username || "",
          furigana: currentUser.furigana || "",
          phoneNumber: currentUser.phoneNumber || "",
          email: currentUser.email || "",
          birthday: currentUser.birthday || "",
          locationProvince: currentUser.locationProvince || "",
          locationCity: currentUser.locationCity || "",
          extra: currentUser.extra || "",
          filePath: currentUser.filePath || "",
          fileID: currentUser.fileID || "",
          userConfirmed: currentUser.userConfirmed,
    
          file: null,
          errorMsg: '',
          isPreviewAvailable: false,
        });
      })
  }
  onChangeUsername(e) {
    this.setState({
      username: e.target.value,
    });
  }
  onChangeFurigana(e) {
    this.setState({
      furigana: e.target.value,
    });
  }
  onChangePhoneNumber(e) {
    this.setState({
      phoneNumber: e.target.value,
    });
  }
  // onChangeEmail(e) {
  //   this.setState({
  //     email: e.target.value,
  //   });
  // }
  onChangeBirthday(e) {
    this.setState({
      birthday: e.target.value,
    });
  }
  onChangeLocationProvince(e) {
    this.setState({
      locationProvince: e.target.value,
    });
  }
  onChangeLocationCity(e) {
    this.setState({
      locationCity: e.target.value,
    });
  }
  onChangeExtra(e) {
    this.setState({
      extra: e.target.value,
    });
  }

  submitPersonalInfo() {
    const personalObject = {
      username: this.state.username,
      furigana: this.state.furigana,
      phoneNumber: this.state.phoneNumber,
      email: this.state.email,
      birthday: this.state.birthday,
      locationProvince: this.state.locationProvince,
      locationCity: this.state.locationCity,
      extra: this.state.extra,
    };
    AuthService.PersonalInfo(personalObject)
      .then((res) => {
        console.log('res', res)
        this.setState({
          successful: true,
          message: "個人情報を登録しました。"
        })
      })
      .catch(error => {
        console.log('error', error)
        this.setState({
          successful: false,
          message: "エラーが発生しました。"
        })
      })

    this.setState({
      successful: true,
      message: "送信中です。"
    })
    if (this.state.ID)
      this.uploadID();
  }
  // onDrop = (files) => {
  //   const [uploadedFile] = files;
  //   this.setState({ file: uploadedFile });

  //   const fileReader = new FileReader();
  //   fileReader.onload = () => {
  //     this.setState({ previewSrc: fileReader.result });
  //   };
  //   fileReader.readAsDataURL(uploadedFile);
  //   this.setState({ isPreviewAvailable: uploadedFile.name.match(/\.(jpeg|jpg|png)$/) });
  //   //this.state.dropRef.current.style.border = '2px dashed #e9ebeb';
  // }
  onDropID = (files) => {
    const [uploadedFile] = files;
    this.setState({ ID: uploadedFile });

    const fileReader = new FileReader();
    fileReader.onload = () => {
      //this.setState({ previewSrc: fileReader.result });
    };
    fileReader.readAsDataURL(uploadedFile);
    // if (this.state.ID)
    //   this.uploadID();
  }
  updateBorder = (dragState) => {
    if (dragState === 'over') {
      this.state.dropRef.current.style.border = '2px solid #000';
    } else if (dragState === 'leave') {
      this.state.dropRef.current.style.border = '2px dashed #e9ebeb';
    }
  };
  uploadImage = async () => {

    try {
      //const { title, description } = state;
      //if (title.trim() !== '' && description.trim() !== '') {
      const file = this.state.file;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);
        // formData.append('title', title);
        // formData.append('description', description);

        this.setState({ errorMsg: '' });
        await axios.post(`${API_URL}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          if (res.data.file_path) {
            const personalObject = {
              email: this.state.email,
              filePath: res.data.file_path
            };
            AuthService.upload(personalObject, "image");
          }
        });
        //props.history.push('/list');
      } else {
        this.setState({ errorMsg: 'Please select a file to add.' });
      }
      //} 
      //else {
      //  setErrorMsg('Please enter all the field values.');
      //}
    } catch (error) {
      error.response && this.setState({ errorMsg: error.response.data });
    }
  };
  uploadID = async () => {

    try {
      const file = this.state.ID;
      if (file) {
        const formData = new FormData();
        formData.append('file', file);

        await axios.post(`${API_URL}/upload`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        }).then(res => {
          if (res.data.file_path) {
            const personalObject = {
              email: this.state.email,
              filePath: res.data.file_path
            };
            AuthService.upload(personalObject, "ID");
            this.setState({
              userConfirmed: 0
            })
          }
        });
      } else {
        this.setState({ errorMsg: 'Please select a file to add.' });
      }
    } catch (error) {
      error.response && this.setState({ errorMsg: error.response.data });
    }
  };
  onQuit =  () => {
    AuthService.quit(this.state.email)
      .then((res) => {
        console.log('res', res)
        this.setState({
          quitMessage: "",
        })
      })
      .catch(error => {
        console.log('error', error)
        this.setState({
          quitMessage: "エラーが発生しました。"
        })
      })
    
      this.setState({quitMessage: "処理中です。"});
  }
  render() {

    return (
      <div className="container">
        {this.state.userReady ? (
          <div>
            <section className="p-memberInfo">
              <div className="c-memberInfo--header">個人情報登録</div>
              <div className="c-memberInfo">
                <div className="c-memberInfo__profile">
                  <div className="c-memberInfo__profile-header">
                    コレクタープロフィール
                  </div>
                  <div className="c-memberInfo__profile-container">
                    <Dropzone
                      onDrop={this.onDropID}
                      onDragEnter={() => this.updateBorder('over')}
                      onDragLeave={() => this.updateBorder('leave')}
                      accept={".jpg,.jpeg,.png,.gif,.pdf"}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <div {...getRootProps({ className: 'drop-zone' })} ref={this.state.dropRef}>
                          <input {...getInputProps()} />
                          {/* <p>Drag and drop a file OR click here to select a file</p> */}
                          {/* <div className="c-memberInfo__profile-img"></div> */}
                          {this.state.ID ? (
                            <p>{this.state.ID.name}</p>
                          ) : (
                            this.state.fileID ? (
                              // <div className="image-preview">
                              //   <img className="preview-image" src={API_URL + '/' + this.state.filePath.replace('\\', '/')} alt="Preview" />
                              // </div>
                              <p>{this.state.fileID.substring(this.state.fileID.lastIndexOf('\\') + 1)}</p>
                            ) : (
                              <div className="c-memberInfo__profile-img"></div>
                            )
                          )}
                          {/* {this.state.file && (
                            <div>
                              <strong>Selected file:</strong> {this.state.file.name}
                            </div>
                          )} */}
                        </div>
                      )}
                    </Dropzone>
                    <div>
                      <div className="c-memberInfo__profile-name">
                        {/* <p>user</p> */}
                        {this.state.userConfirmed == 1 ? (
                          <div style={{ background: "#46a711" }}>本人確認済</div>
                        ) : (
                          <div>本人確認未</div>
                        )}
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
                  <form action="">
                    <div>
                      <label htmlFor="">お名前</label>
                      <input
                        type="text"
                        value={this.state.username}
                        onChange={this.onChangeUsername}
                        name=""
                        id=""
                      />
                    </div>
                    <div>
                      <label htmlFor="">フリガナ</label>
                      <input
                        type="text"
                        value={this.state.furigana}
                        onChange={this.onChangeFurigana}
                        name=""
                        id=""
                      />
                    </div>
                    <div>
                      <label htmlFor="">電話番号</label>
                      <input
                        type="text"
                        value={this.state.phoneNumber}
                        onChange={this.onChangePhoneNumber}
                        name=""
                        id=""
                      />
                    </div>
                    {/* <div>
                      <label htmlFor="">メールアドレス</label>
                      <input
                        type="text"
                        value={this.state.email}
                        onChange={this.onChangeEmail}
                        name=""
                        id=""
                      />
                    </div> */}
                    <div>
                      <label htmlFor="">生年月日</label>
                      <input
                        type="text"
                        value={this.state.birthday}
                        onChange={this.onChangeBirthday}
                        name=""
                        id=""
                      />
                    </div>
                    <div>
                      <label htmlFor="">都道府県</label>
                      <input
                        type="text"
                        value={this.state.locationProvince}
                        onChange={this.onChangeLocationProvince}
                        name=""
                        id=""
                      />
                    </div>
                    <div>
                      <label htmlFor="">市区町村</label>
                      <input
                        type="text"
                        value={this.state.locationCity}
                        onChange={this.onChangeLocationCity}
                        name=""
                        id=""
                      />
                    </div>
                    <div>
                      <label htmlFor="">それ以降の住所</label>
                      <input
                        type="text"
                        value={this.state.extra}
                        onChange={this.onChangeExtra}
                        name=""
                        id=""
                      />
                    </div>
                  </form>
                  {!this.state.successful && (
                    <button onClick={()=>{this.submitPersonalInfo()}}>内容を送信する</button>
                  )}
                  {this.state.message && (
                    <div className="form-group">
                      <div
                        className={
                          this.state.successful
                            ? "alert alert-success"
                            : "alert alert-danger"
                        }
                        role="alert"
                      >
                        {this.state.message}
                      </div>
                    </div>
                  )}
                  <div className="c-memberInfo__form__status">
                    <div className="c-memberInfo__form__status--pass">
                      <div className="c-memberInfo__form__status--pass-header">
                        パスワード
                      </div>
                      <div className="c-memberInfo__form__status--pass">
                        <Link to="/profile/change-password">パスワードを変更</Link>
                      </div>
                    </div>
                    <div className="c-memberInfo__form__status-user">
                      <div className="c-memberInfo__form__status-user-header">
                        会員ステータス
                      </div>
                      <div className="c-memberInfo__form__status-user-data">
                        一般会員
                      </div>
                    </div>
                  </div>
                  {/* <div className="c-member-out">
                    <a onClick={()=>this.onQuit()}>ユーザー退会</a>
                    {this.state.quitMessage && (
                      <div
                        className={"alert alert-success"}
                        role="alert"
                      >
                        確認しながらお待ちください。
                      </div>
                    )}
                  </div> */}
                </div>
              </div>
            </section>
            <section className="p-memberAuth">
              <div className="c-memberAuth--header">
                <p>本人認証</p>
              </div>
              <div className="c-memberAuth">
                { (this.state.userConfirmed != 0 && this.state.userConfirmed != 1) && (
                  <div className="c-memberAuth__kyc">
                    <p>
                      オーナー権の売却には、本人認証が必要です。
                      こちらから本人認証を完了させてください。
                    </p>
                    {/* <Dropzone
                      onDrop={this.onDropID}
                      accept={".pdf,.jpg,.jpeg,.png,.gif"}
                    >
                      {({ getRootProps, getInputProps }) => (
                        <button {...getRootProps({ className: 'drop-zone-trans' })} ref={this.state.dropRef}>本人確認をする
                          <input {...getInputProps()} />
                        </button>
                      )}
                    </Dropzone> */}
                    <button>
                        本人確認をする
                    </button>
                  </div>
                )}

                {(this.state.userConfirmed === 0) && (
                  <div className="form-group">
                    <div
                      className={"alert alert-success"}
                      role="alert"
                    >
                      本人確認は審査中です。
                    </div>
                  </div>
                )}
                {(this.state.userConfirmed === 1) && (
                  <div className="form-group">
                    <div
                      className={"alert alert-success"}
                      role="alert"
                    >
                      本人認証済みです。
                    </div>
                  </div>
                )}
                {/* <div className="c-memberAuth__twoStep">
                  <button>2段階認証を設定する</button>
                </div> */}
              </div>
            </section>
          </div>
        ) : null}
      </div>
    );
  }
}
