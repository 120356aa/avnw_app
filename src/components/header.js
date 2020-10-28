import React, { useEffect, useState, useContext } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { useRoute } from '@react-navigation/native';

import Context from '../context/context.js';
import { merch_categories } from '../../dummydb.js';

import CartIMG from '../assets/cart.png';
import ProfileIMG from '../assets/profile.png';
import LogoIMG from '../assets/logo.png';
import CloseIMG from '../assets/close.png';
import FilterIMG from '../assets/filter.png';

import {
  StyleSheet,
  View,
  Image,
  Text,
  TouchableNativeFeedback,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler'

export default function Header(props) {
  const [filterToggle, setFilterToggle] = useState(false);
  const [cart, setCart] = useState([]);

  const route = useRoute();
  const cartContext = useContext(Context);

  useEffect(() => {
    setCart(cartContext.cart);
  },[cartContext.cart]);

  const checkAuth = _ => cartContext.isUserAuthenticated ? 'Profile' : 'Login';
  const handleFilterSelect = (id) => cartContext.handleFilterList(id);
  const handleFilterToggle = _ => setFilterToggle(!filterToggle);

  return (
    <View style={styles.container}>
      <TouchableNativeFeedback onPress={ _ => props.navigation.navigate('Index')} >
        {/* <LinearGradient colors={['#01aef1', '#009cd8', '#009cd8']} style={styles.gradient} > */}
          <View name="logo" style={styles.logo}>
            <Image source={LogoIMG} style={styles.logoIMG} />
          </View>
        {/* </LinearGradient> */}
      </TouchableNativeFeedback>

      <View name="navBox" style={styles.navBox}>
        {/* { route.name === 'Store' ? (
          <TouchableNativeFeedback onPress={handleFilterToggle} >
            <View name="filter" style={styles.filter}>
              { filterToggle ? (
                <Image source={CloseIMG} style={styles.close_IMG} />
              ) : (
                <Image source={FilterIMG} style={styles.filter_IMG} />
              ) }
            </View>
          </TouchableNativeFeedback>
        ) :null } */}

        { filterToggle ? (
          <View name="filter_container" style={styles.filter_container}>
            <View style={styles.filter_container_content}>
              { merch_categories.map((el) => {
                return (
                  <TouchableOpacity
                    key={el.id}
                    style={styles.filter_container_content_btn}
                    onPress={ _ => handleFilterSelect(el.category) }>
                    { cartContext.filterList.includes(el.category) ? (
                      <Text style={styles.filter_container_content_text_on}>{el.category}</Text>
                    ) : (
                      <Text style={styles.filter_container_content_text}>{el.category}</Text>
                    )}
                  </TouchableOpacity>
                )
              })}
            </View>
          </View>
        ) : null }
        
        <View style={styles.menu_wrap} >
          <TouchableNativeFeedback onPress={ _ => props.navigation.navigate('Cart')} >
            <View name="cart" style={styles.cart}>
              <Image source={CartIMG} style={styles.cartIMG} />
              {cart.length > 0 ? (
                <View style={styles.cart_notification}>
                  <Text style={styles.cart_notification_text}>{cart.length}</Text>
                </View>
              ) : null }
            </View>  
          </TouchableNativeFeedback>

          <TouchableNativeFeedback onPress={ _ => props.navigation.navigate(checkAuth())} >
            <View name="profile" style={styles.profile}>
              <Image source={ProfileIMG} style={styles.profileIMG} />
            </View>  
          </TouchableNativeFeedback>
        </View>

        {/* <TouchableOpacity>
          <View style={styles.navBtnBox}>
            <View style={styles.navBtnLine}></View>
            <View style={styles.navBtnLine}></View>
            <View style={styles.navBtnLine}></View>
          </View>
        </TouchableOpacity> */}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    width: '100%',
    paddingTop: 15,
    paddingRight: 15,
    paddingLeft: 15,
    paddingBottom: 15,
    justifyContent: 'space-between',
    zIndex: 3,
    backgroundColor: '#009cd8',
  },

    logo: {
      width: 40,
      height: 40,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 6,
    },

    gradient: {
      padding: 0,
      alignItems: 'center',
      borderRadius: 6,
    },

    logoIMG: {
      width: 30,
      height: 30,
    },

    navBox: {
      height: 42,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      alignSelf: 'flex-end',
      // borderWidth: 1,
    },

      filter: {
        width: 42,
        height: 42,
        backgroundColor: '#fff',
        // shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        // shadowOpacity: 0.28,
        // shadowRadius: 3.2,
        // elevation: 8,
        marginRight: 15,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
      },

      close_IMG: {
        width: 16,
        height: 16,
        opacity: 0.35,
      },

      filter_IMG: {
        width: 26,
        height: 26,
      },

      filter_container: {
        width: 150,
        marginTop: 74,
        borderRadius: 6,
        paddingLeft: 10,
        paddingRight: 10,
        paddingTop: 20,
        paddingBottom: 25,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        backgroundColor: '#fff',
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0,
        },
        shadowOpacity: 0.50,
        shadowRadius: 10,
        elevation: 20,
        zIndex: 1,
      },

        filter_container_header_title: {
          fontSize: 15,
          fontWeight: 'bold',
          color: '#7D7D7D',
        },

        filter_container_content: {
          flexDirection: 'column',
          justifyContent: 'flex-start',
        },

          filter_container_content_btn: {
            // borderWidth: 1,
          },  

          filter_container_content_text: {
            color: '#7D7D7D',
            padding: 6,
            fontWeight: 'bold',
          },

          filter_container_content_text_on: {
            color: '#009cd8',
            padding: 6,
            fontWeight: 'bold',
          },

      menu_wrap: {
        width: 100,
        height: 42,
        borderRadius: 21,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        shadowColor: "#000",
        // shadowOffset: {
        //   width: 0,
        //   height: 2,
        // },
        // shadowOpacity: 0.28,
        // shadowRadius: 3.2,
        // elevation: 8,
        // borderWidth: 1,
      },

        cart: {
          width: 52,
          height: 42,
          justifyContent: 'center',
          alignItems: 'center',
          borderTopLeftRadius: 21,
          borderBottomLeftRadius: 21,
          backgroundColor: '#fff',
        },

        cartIMG: {
          width: 24,
          height: 24,
          opacity: 0.4,
          marginLeft: 8,
        },

        cart_notification: {
          width: 16,
          height: 16,
          borderRadius: 8,
          bottom: 6,
          left: 14,
          position: 'absolute',
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
        },

          cart_notification_text: {
            color: '#fff',
            fontSize: 9,
            fontWeight: 'bold',
          },

        profile: {
          width: 52,
          height: 42,
          justifyContent: 'center',
          alignItems: 'center',
          borderTopRightRadius: 21,
          borderBottomRightRadius: 21,
          backgroundColor: '#fff',
        },

        profileIMG: {
          width: 24,
          height: 24,
          marginRight: 8,
          opacity: 0.4,
        },

        navBtnBox: {
          width: 26,
          height: 20,
          // borderWidth: 1,
          marginLeft: 20,
          justifyContent: 'space-between',
        },

        navBtnLine: {
          width: '100%',
          height: 4,
          borderRadius: 6,
          backgroundColor: '#fdfdfd',
        },
});