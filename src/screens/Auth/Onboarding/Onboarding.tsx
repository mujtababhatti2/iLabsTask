import { changeFirstRun } from "../../../store/theme";
import { Brand, Button } from "../../../components";
import { useTheme } from "../../../hooks";
import React, { useState } from "react";
import {
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  StatusBar,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import LinearGradient from "react-native-linear-gradient";
import { useDispatch } from "react-redux";
import {
  responsiveHeight,
  responsiveWidth,
} from "react-native-responsive-dimensions";
import LoginButton from "../../../components/loginButton";
import NavigationService from "../../../navigators/NavigationService";

const { width, height } = Dimensions.get("window");

const slides = [
  {
    id: "1",
    title: "Welcome to",
    title2: "E-Voting",
    subtitles: "Where democracy meets technology!",
    content:
      "Participate in elections from anywhere in pakistan, with our secured blockchain technology.",
  },
  {
    id: "2",
    title: "The Power of",
    title2: "Blockchain Technology",
    subtitles: "Where democracy meets technology!",
    content:
      "A decentralized system that records every value on a distributed ledger",
  },
  {
    id: "3",
    title: "Get Started and",
    title2: "Start Voting Today",
    subtitles: "Where democracy meets technology!",
    content: "Enter your details and verify your self to start voting today!",
  },
];

type Props = {
  item: {
    id: number;
    image: object;
    color: string;
    title: string;
    title2: string;
    subtitles: string;
    bridgeImage: object;
    content: string;
  };
  navigation: any;
};

const Slide = ({ item, navigation }: Props) => {
  const { Layout, Colors, Gutters, Fonts } = useTheme();

  return (
    <View style={[Layout.fill, Gutters.smallHPadding, { width: width }]}>
      <Text
        style={[
          Layout.alignItemsStart,
          Fonts.titletopheading,
          { color: Colors.white },
        ]}
      >
        {item.title}
      </Text>
      <Text style={[Layout.alignItemsStart, Fonts.titleheading]}>
        {item?.title2}
      </Text>
      <Text
        style={[
          Layout.alignItemsStart,
          Fonts.textSmall,
          Gutters.smallVPadding,
          { color: Colors.white },
        ]}
      >
        {item?.subtitles}
      </Text>
      <Text
        style={[
          Layout.alignItemsStart,
          Fonts.textRegular,
          {
            color: Colors.textColor,
            fontSize: 18,
          },
        ]}
      >
        {item?.content}
      </Text>
    </View>
  );
};

const OnboardingScreen = ({ navigation }: any) => {
  const dispatch = useDispatch();
  const [modalVisible, setModalVisible] = useState(false);

  const { Colors, Layout, Images, Gutters } = useTheme();
  const ref = React.useRef<FlatList<any>>(null);
  const [currentSlideIndex, setCurrentSlideIndex] = React.useState(0);

  const updateCurrentSlideIndex = (e: any) => {
    const contentOffsetX = e.nativeEvent.contentOffset.x;
    const currentIndex = Math.round(contentOffsetX / width);
    setCurrentSlideIndex(currentIndex);
  };

  const goToNextSlide = () => {
    const nextSlideIndex = currentSlideIndex + 1;
    if (nextSlideIndex != slides.length) {
      const offset = nextSlideIndex * width;
      ref.current?.scrollToOffset({ offset });
      setCurrentSlideIndex(currentSlideIndex + 1);
    }
  };

  const skip = () => {
    const lastSlideIndex = slides.length - 1;
    const offset = lastSlideIndex * width;
    ref.current?.scrollToOffset({ offset });
    setCurrentSlideIndex(lastSlideIndex);
  };

  const Footer = () => {
    const { Layout, Fonts } = useTheme();
    return (
      <View
        style={{
          paddingHorizontal: 20,
          position: "absolute",
          bottom: 10,
          width: "100%",
        }}
      >
        <LoginButton
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          firstPress={() => {
            navigation.navigate("Auth", {
              screen: "Signin",
              params: { title: "Election Commission" },
            });
            setModalVisible(false);
          }}

          // secondPress={navigation.navigate("Signin")}
        />
        <Text
          style={[
            Fonts.textSmall,
            { color: Colors.white, textAlign: "center" },
          ]}
        >
          Already registered?
          <Text
            style={[Fonts.textBold, { color: Colors.primary }]}
            onPress={() => {
              // NavigationService.navigate({})
            }}
          >
            {" "}
            Login{" "}
          </Text>
          to vote
        </Text>
      </View>
    );
  };

  const Header = () => {
    return (
      <Image
        source={Images.logo}
        style={[
          Gutters.smallLMargin,
          {
            width: 100,
            height: 100,
            resizeMode: "contain",
          },
        ]}
      />
    );
  };

  return (
    <View style={[Layout.fill]}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle={"light-content"}
      />
      <ImageBackground source={Images.backgroundImage} style={[Layout.fill]}>
        <View style={{ marginTop: responsiveHeight(6) }} />
        <Header />
        <FlatList
          ref={ref}
          onMomentumScrollEnd={updateCurrentSlideIndex}
          showsHorizontalScrollIndicator={false}
          horizontal
          data={slides}
          pagingEnabled
          renderItem={({ item }) => (
            <Slide item={item} navigation={navigation} />
          )}
        />
        <View
          style={{
            flexDirection: "row",
            position: "absolute",
            top: "45%",
            left: 20,
          }}
        >
          {slides.map((_, index) => (
            <View
              key={index}
              style={[
                {
                  height: 9.3,
                  width: 9.6,
                  backgroundColor: "#FEEDF1",
                  marginHorizontal: 3,
                  borderRadius: 10,
                },
                currentSlideIndex == index && {
                  backgroundColor: "#008F04",
                },
              ]}
            />
          ))}
        </View>

        <Footer />
      </ImageBackground>
    </View>
  );
};

export default OnboardingScreen;
