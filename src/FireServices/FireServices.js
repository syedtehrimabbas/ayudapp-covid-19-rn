import {GoogleSignin} from '../../node_modules/react-native-google-signin/index';
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';

class FireServices {
  getTockenForUniversalApi = (callback) => {
    console.log('hre');
    fetch('https://www.universal-tutorial.com/api/getaccesstoken', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'api-token':
          'PSjAYmhK5ANj9aU0bu4N41gB0idOzOUVILqKe5SgWFh_srv54kfvddjSRSxjYkD08CY',
        'user-email': 'syedtehrimabbas@gmail.com',
      },
    })
      .then(async (res) => {
        const data = await res.json();
        callback({isSuccess: true, token: data.auth_token});
      })
      .catch((err) => {
        console.log('error ---', err);
        callback({isSuccess: false, err: err});
      });
  };
  fetchCountries = (token, callback) => {
    console.log('token', token);
    fetch('https://www.universal-tutorial.com/api/countries', {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        'user-email': 'syedtehrimabbas@gmail.com',
        Authorization: 'Bearer ' + token,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        console.log('data ---', data);
        callback({isSuccess: true, data: data});
      })
      .catch((err) => {
        callback({isSuccess: false, error: err});
        console.log('error ---', err);
      });
  };
  getStatesFromApi = (accessToken, cont, callback) => {
    fetch(`https://www.universal-tutorial.com/api/states/${cont}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        console.log('data ---', data);
        callback({isSuccess: true, data: data});
      })
      .catch((err) => {
        callback({isSuccess: false, error: err});
        console.log('error ---', err);
      });
  };
  getCitiesFromApi = (accessToken, state, callback) => {
    fetch(`https://www.universal-tutorial.com/api/cities/${state}`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + accessToken,
      },
    })
      .then(async (res) => {
        const data = await res.json();
        console.log('data ---', data);
        callback({isSuccess: true, data: data});
      })
      .catch((err) => {
        callback({isSuccess: false, error: err});
        console.log('error ---', err);
      });
  };
  uploadImage = (path, callback) => {
    const storageRef = storage().ref(`file`);
    let fileUri = decodeURI(path);
    const task = storageRef.putFile(fileUri);
    task
      .then((res) => {
        console.log('res-----', res);
        callback({isSuccess: true, res: res});
      })
      .catch((e) => {
        callback({isSuccess: false, error: error});
        console.log('error', e);
      });
  };
  updateUserProfile = (user, callback) => {
    firestore()
      .collection('Profile')
      .doc(user.uid)
      .update({
        name: user.displayName,
        email: user.email,
      })
      .then((profile) => {
        callback({isSuccess: true, response: profile});
      })
      .catch((err) => {
        callback({isSuccess: false, err: err});
      });
  };
  serUserProfile = (uid, callback) => {
    firestore()
      .collection('Profile')
      .doc(uid)
      .set({
        userConfirmation: 'true',
      })
      .then((profile) => {
        callback({isSuccess: true, response: profile});
      })
      .catch((err) => {
        callback({isSuccess: false, err: err});
      });
  };
  updateUserBiodata = (
    fname,
    lname,
    phone,
    otherPhone,
    country,
    province,
    district,
    city,
    town,
    building,
    time,
    userType,
    callback,
  ) => {
    firestore()
      .collection('Profile')
      .doc(auth().currentUser.uid)
      .update({
        biodata: {
          firstName: fname,
          lastName: lname,
          phone: phone,
          otherPhone: otherPhone,
          country: country,
          province: province,
          district: district,
          city: city,
          town: town,
          building: building,
          time: time,
          userType: userType,
        },
      })
      .then((profile) => {
        callback({isSuccess: true, response: profile});
      })
      .catch((err) => {
        callback({isSuccess: false, err: err});
      });
  };
  updateUserStatus = (type, callback) => {
    firestore()
      .collection('Profile')
      .doc(auth().currentUser.uid)
      .update({
        userType: type,
      })
      .then((res) => {
        callback({isSuccess: true});
      })
      .catch((err) => {
        callback({isSuccess: false, error: err});
      });
  };
  getUserProfile = (callback) => {
    firestore()
      .collection('Profile')
      .doc(auth().currentUser.uid)
      .get()
      .then((res) => {
        callback({isSuccess: true, user: res});
      });
  };
  getCurrentUser = async () => {
    const currentUser = await GoogleSignin.getCurrentUser();
    this.setState({currentUser});
  };
  getRequestedOrderByUser = (callback) => {
    let requestsArray = [];
    firestore()
      .collection('userRequests')
      .get()
      .then((res) => {
        res.forEach((documentSnapshoot) => {
          requestsArray.push({
            id: documentSnapshoot.id,
            requests: documentSnapshoot.data(),
          });
          callback({isSuccess: true, requests: requestsArray});
        });
      });
  };
  getRequestedOrder = (id, callback) => {
    firestore()
      .collection('userRequests')
      .doc(id)
      .get()
      .then((res) => {
        callback({isSuccess: true, order: res});
      });
  };
  needyUserForm = (
    name,
    ageRange1,
    ageRange2,
    ageRange3,
    ageRange4,
    ageRange5,
    employment,
    accountDetail,
    helpType,
    coronaDiseaseType,
    eggs,
    soap,
    Medications,
    userType,
    latitude,
    longitude,
    currentTime,
    diabetes,
    hipertensión,
    cancer,
    other,
    Washingsoap,
    Cloro,
    Bathsoap,
    Disinfectant,
    Alcohol,
    Toothpaste,
    Deodorant,
    Babydiapers,
    rice,
    grains,
    Flour,
    Eggs,
    Pastas,
    Vegetables,
    Fruit,
    Sugar,
    Salt,
    cannedfood,
    Oil,
    Meat,
    Bread,
    Cheese,
    Ham,
    Water,
    Creams,
    Milk,
    babymilk,
    Dogfood,
    Catfood,
    Hypertension,
    Diabetes,
    FluCold,
    Gastrointestinal,
    Anxiety,
    Insomnia,
    userInformation,
    callback,
  ) => {
    firestore()
      .collection('userRequests')
      .add({
        name: name,
        ageRange1: ageRange1,
        ageRange2: ageRange2,
        ageRange3: ageRange3,
        ageRange4: ageRange4,
        ageRange5: ageRange5,
        employment: employment,
        accountDetail: accountDetail,
        helpType: helpType,
        coronaDiseaseType: coronaDiseaseType,
        eggs: eggs,
        soap: soap,
        medications: Medications,
        userType: userType,
        userId: auth().currentUser.uid,
        latitude: latitude,
        longitude: longitude,
        orderTime: currentTime,

        diabetes: diabetes,
        hipertensión: hipertensión,
        cancer: cancer,
        other: other,
        Washingsoap: Washingsoap,
        Cloro: Cloro,
        Bathsoap: Bathsoap,
        Disinfectant: Disinfectant,
        Alcohol: Alcohol,
        Toothpaste: Toothpaste,
        Deodorant: Deodorant,
        Babydiapers: Babydiapers,
        rice: rice,
        grains: grains,

        Flour: Flour,
        Eggs: Eggs,
        Pastas: Pastas,
        Vegetables: Vegetables,
        Fruit: Fruit,
        Sugar: Sugar,
        Salt: Salt,
        cannedfood: cannedfood,
        Oil: Oil,
        Meat: Meat,
        Bread: Bread,
        Cheese: Cheese,
        Ham: Ham,
        Water: Water,
        Creams: Creams,
        Milk: Milk,
        babymilk: babymilk,
        Dogfood: Dogfood,
        Catfood: Catfood,
        Hypertension: Hypertension,
        Diabetes: Diabetes,
        FluCold: FluCold,
        Gastrointestinal: Gastrointestinal,
        Anxiety: Anxiety,
        Insomnia: Insomnia,
        RequestStatus: 'Pending',
        userInformation: userInformation,
        userType: 'Needy',
      })
      .then((res) => {
        console.log('requestreas', res);
        firestore()
          .collection('Profile')
          .doc(auth().currentUser.uid)
          .update({
            requestId: res.id,
          })
          .then(() => {
            callback({isSuccess: true});
          })
          .catch((err) => {
            callback({isSuccess: false, error: err});
          });
      });
  };
  verifyPhoneNumber = (phone, callBack) => {
    console.log('herererer', phone);
    auth()
      .signInWithPhoneNumber(phone)
      .then((res) => {
        console.log('firebase result,', res);
        callBack({isSuccess: true, response: res});
      })
      .catch((error) => {
        callBack({isSuccess: false, error: error});
      });
  };
  confirmVerificationCode = (confirmResult, verificationCode, callBack) => {
    confirmResult
      .confirm(verificationCode)
      .then((res) => {
        console.log('res-3456789876545678', res);
        callBack({isSuccess: true, response: res});
      })
      .catch((err) => {
        console.log('err', err);
        callBack({isSuccess: false, error: err});
      });
  };

  addBankDetail = (
    name,
    country,
    province,
    district,
    city,
    town,
    buildingAddress,
    time,
    term,
    image,
    userType,
    latitude,
    longitude,
    callback,
  ) => {
    firestore()
      .collection('userRequests')
      .add({
        name: name,
        country: country,
        province: province,
        district: district,
        city: city,
        town: town,
        building: buildingAddress,
        time: time,
        term: term,
        image: image,
        userType: 'BankPoint',
        latitude: latitude,
        longitude: longitude,
        userId: auth().currentUser.uid,
      })
      .then(() => {
        callback({isSuccess: true});
      })
      .catch((e) => {
        callback({isSuccess: false});
      });
  };
}

const Services = new FireServices();
export default Services;
