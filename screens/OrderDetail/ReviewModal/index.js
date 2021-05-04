import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
  ActivityIndicator,
} from 'react-native';

import Button from '../../../components/ButtonFill';
import star from '../../../assets/images/star.png';
import starFull from '../../../assets/images/star_full.png';
import like from '../../../assets/images/thumb_up.png';
import unlike from '../../../assets/images/thumb_red.png';
import { colors, metrics } from '../../../styles';

const ReviewModal = ({ order, handleSubmit }) => {
  const [foodReview, setFoodReview] = useState(1);
  const [deliveryTimeReview, setDeliveryTimeReview] = useState(1);
  const [description, setDescription] = useState('');
  const [isOk, setIsOk] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = () => {
    const payload = {
      order_id: order?.id,
      description,
      food_review: foodReview,
      deliverytime_review: deliveryTimeReview,
      order_ok: isOk,
    };
    setLoading(true);
    handleSubmit(payload);
  };

  return (
    <View
      style={{
        flex: 1,
        padding: metrics.basePadding,
        justifyContent: 'center',
      }}
    >
      {loading ? (
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <ScrollView>
          <Text style={{ fontFamily: 'roboto', fontSize: 18 }}>
            Avaliar o pedido #{order?.id}
          </Text>
          <View style={{ paddingTop: metrics.basePadding }}>
            <View style={{ flexDirection: 'column' }}>
              <Text
                style={{ fontFamily: 'roboto-light', fontSize: 16 }}
              >
                Avaliação da comida (1-5):
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: metrics.baseMargin,
                }}
              >
                {[...Array(5).keys()].map(e => (
                  <TouchableOpacity
                    onPress={() => setFoodReview(e + 1)}
                  >
                    <View style={{ paddingHorizontal: 5 }}>
                      <Image
                        style={{ width: 32, height: 32 }}
                        source={foodReview >= e + 1 ? starFull : star}
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          <View style={{ paddingTop: metrics.basePadding }}>
            <View style={{ flexDirection: 'column' }}>
              <Text
                style={{ fontFamily: 'roboto-light', fontSize: 16 }}
              >
                Avaliação do tempo de entrega (1-5):
              </Text>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: metrics.baseMargin,
                }}
              >
                {[...Array(5).keys()].map(e => (
                  <TouchableOpacity
                    onPress={() => setDeliveryTimeReview(e + 1)}
                  >
                    <View style={{ paddingHorizontal: 5 }}>
                      <Image
                        style={{ width: 32, height: 32 }}
                        source={
                          deliveryTimeReview >= e + 1
                            ? starFull
                            : star
                        }
                      />
                    </View>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
          <View style={{ paddingTop: metrics.basePadding }}>
            <View style={{ flexDirection: 'column' }}>
              <Text
                style={{ fontFamily: 'roboto-light', fontSize: 16 }}
              >
                Avaliação do pedido:
              </Text>
            </View>
            <View
              style={{
                alignItems: 'center',
                marginTop: metrics.baseMargin,
              }}
            >
              <TextInput
                style={{
                  width: '80%',
                  borderWidth: 1,
                  borderColor: colors.light,
                  padding: metrics.basePadding / 1.5,
                  borderRadius: metrics.baseRadius,
                }}
                multiline
                placeholder="Comente aqui como foi seu pedido e o que achou :)"
                onChangeText={text => setDescription(text)}
              />
            </View>
          </View>
          <View style={{ paddingTop: metrics.basePadding }}>
            <View style={{ flexDirection: 'column' }}>
              <Text
                style={{ fontFamily: 'roboto-light', fontSize: 16 }}
              >
                Seu pedido chegou certo?
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginTop: metrics.baseMargin,
              }}
            >
              <TouchableOpacity onPress={() => setIsOk(true)}>
                <View style={{ paddingHorizontal: 5 }}>
                  <Image
                    style={{
                      width: 64,
                      height: 64,
                      opacity: isOk === true ? 1 : 0.5,
                    }}
                    source={like}
                  />
                </View>
              </TouchableOpacity>
              <TouchableOpacity onPress={() => setIsOk(false)}>
                <View style={{ paddingHorizontal: 5 }}>
                  <Image
                    style={{
                      transform: [{ scaleY: -1 }, { scaleX: -1 }],
                      width: 64,
                      height: 64,
                      opacity: isOk === false ? 1 : 0.5,
                    }}
                    source={unlike}
                  />
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ alignItems: 'center' }}>
            <Button
              style={{
                marginTop: metrics.baseMargin * 2,
                width: 150,
                height: 40,
                opacity: isOk === null ? 0.5 : 1,
              }}
              disabled={isOk === null || description.length === 0}
              title="AVALIAR"
              color={colors.success}
              fontColor={colors.white}
              onPress={submit}
            />
          </View>
        </ScrollView>
      )}
    </View>
  );
};

export default ReviewModal;
