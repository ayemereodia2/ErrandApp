import React, { useEffect, useRef, useState } from 'react';
import {
  Dimensions, ScrollView, TouchableOpacity, View
} from 'react-native';

const Swipe = (props) => {

  const styles = {
   container: {
     backgroundColor: 'transparent',
     position: 'relative',
     flex: 1
   },
 
   wrapperIOS: {
     backgroundColor: 'transparent'
   },
 
   wrapperAndroid: {
     backgroundColor: 'transparent',
     flex: 1
   },
 
   slide: {
     backgroundColor: 'transparent'
   },
 
   pagination_x: {
     position: 'absolute',
     bottom: 80,
     left: 0,
     right: 0, 
     flexDirection: 'row',
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: 'transparent'
   },
 
   pagination_y: {
     position: 'absolute',
     right: 15,
     top: 0,
     bottom: 0,
     flexDirection: 'column',
     flex: 1,
     justifyContent: 'center',
     alignItems: 'center',
     backgroundColor: 'transparent'
   },
 
   title: {
     height: 30,
     justifyContent: 'center',
     position: 'absolute',
     paddingLeft: 10,
     bottom: -30,
     left: 0,
     flexWrap: 'nowrap',
     width: 250,
     backgroundColor: 'transparent'
   },
 
   buttonWrapper: {
     backgroundColor: 'transparent',
     flexDirection: 'row',
     position: 'absolute',
     top: 0,
     left: 0,
     flex: 1,
     paddingHorizontal: 10,
     paddingVertical: 10,
     justifyContent: 'space-between',
     alignItems: 'center'
   },
 
   buttonText: {
     fontSize: 50,
     color: '#007aff'
   }
 }

   const initialState = (props, updateIndex = false) => {
    const state = state || {
      width: 0,
      height: 0,
      offset: { x: 0, y: 0 },
    };

    const initState = {
      autoplayEnd: false,
      children: null,
      loopJump: false,
      offset: {},
    };

    initState.children = Array.isArray(props.children)
      ? props.children.filter((child) => child)
      : props.children;

    initState.total = initState.children ? initState.children.length || 1 : 0;

    if (state.total === initState.total && !updateIndex) {
      initState.index = state.index;
    } else {
      initState.index =
        initState.total > 1 ? Math.min(props.index, initState.total - 1) : 0;
    }

    const { width, height } = Dimensions.get('window');

    initState.dir = props.horizontal === false ? 'y' : 'x';

    if (props.width) {
      initState.width = props.width;
    } else if (state && state.width) {
      initState.width = state.width;
    } else {
      initState.width = width;
    }

    if (props.height) {
      initState.height = props.height;
    } else if (state && state.height) {
      initState.height = state.height;
    } else {
      initState.height = height;
    }

    initState.offset[initState.dir] =
      initState.dir === 'y' ? height * props.index : width * props.index;

    return initState;
   };
  
  const [state, setState] = useState(initialState(props));
  const [initialRender, setInitialRender] = useState(true);
  const autoplayTimer = useRef(null);
  const loopJumpTimer = useRef(null);
  const scrollView = useRef(null);

  useEffect(() => {
    autoplay();
  }, []);

  useEffect(() => {
    return () => {
      if (autoplayTimer.current) clearTimeout(autoplayTimer.current);
      if (loopJumpTimer.current) clearTimeout(loopJumpTimer.current);
    };
  }, []);

  useEffect(() => {
    if (state.index !== state.total && props.index !== state.index) {
      setState(initialState(props, props.index !== state.index));
    }
  }, [props]);

 

  const fullState = () => {
    return Object.assign({}, state, { isScrolling: false });
  };

  const onLayout = (event) => {
    const { width, height } = event.nativeEvent.layout;
    const offset = (state.offset = {});
    const layoutState = { width, height };

    if (state.total > 1) {
      let setup = state.index;
      if (props.loop) {
        setup++;
      }
      offset[state.dir] = state.dir === 'y' ? height * setup : width * setup;
    }

    if (!state.offset) {
      layoutState.offset = offset;
    }

    if (initialRender && state.total > 1) {
      scrollView.current.scrollTo({ ...offset, animated: false });
      setInitialRender(false);
    }

    setState(layoutState);
  };

  const loopJump = () => {
    if (!state.loopJump) return;
    const i = state.index + (props.loop ? 1 : 0);
    const scrollViewInstance = scrollView.current;

    loopJumpTimer.current = setTimeout(() => {
      if (scrollViewInstance.setPageWithoutAnimation) {
        scrollViewInstance.setPageWithoutAnimation(i);
      } else {
        if (state.index === 0) {
          scrollViewInstance.scrollTo(
            props.horizontal === false
              ? { x: 0, y: state.height, animated: false }
              : { x: state.width, y: 0, animated: false }
          );
        } else if (state.index === state.total - 1) {
          if (props.horizontal === false) {
            scrollViewInstance.scrollTo({
              x: 0,
              y: state.height * state.total,
              animated: false,
            });
          } else {
            scrollViewInstance.scrollTo({
              x: state.width * state.total,
              y: 0,
              animated: false,
            });
          }
        }
      }
    }, scrollViewInstance.setPageWithoutAnimation ? 50 : 300);
  };

  const autoplay = () => {
    if (
      !Array.isArray(state.children) ||
      !props.autoplay ||
      state.isScrolling ||
      state.autoplayEnd
    )
      return;

    autoplayTimer.current && clearTimeout(autoplayTimer.current);
    autoplayTimer.current = setTimeout(() => {
      if (
        !props.loop &&
        (props.autoplayDirection
          ? state.index === state.total - 1
          : state.index === 0)
      )
        return setState({ autoplayEnd: true });

      scrollBy(props.autoplayDirection ? 1 : -1);
    }, props.autoplayTimeout * 1000);
  };

  const onScrollBegin = (e) => {
    state.isScrolling = true;
    props.onScrollBeginDrag && props.onScrollBeginDrag(e, fullState(), Swipe);
  };

  const onScrollEnd = (e) => {
    state.isScrolling = false;

    if (!e.nativeEvent.contentOffset) {
      if (state.dir === 'x') {
        e.nativeEvent.contentOffset = {
          x: e.nativeEvent.position * state.width,
        };
      } else {
        e.nativeEvent.contentOffset = {
          y: e.nativeEvent.position * state.height,
        };
      }
    }

    updateIndex(e.nativeEvent.contentOffset, state.dir, () => {
      autoplay();
      loopJump();
    });

    props.onMomentumScrollEnd && props.onMomentumScrollEnd(e, fullState(), Swipe);
  };

  const onScrollEndDrag = (e) => {
    const { contentOffset } = e.nativeEvent;
    const previousOffset = state.offset;
    state.isScrolling = false;

    if (
      previousOffset.x === contentOffset.x &&
      previousOffset.y === contentOffset.y
    ) {
      if (
        !props.loop &&
        (props.autoplayDirection
          ? state.index === state.total - 1
          : state.index === 0)
      )
        return setState({ autoplayEnd: true });

      scrollBy(props.autoplayDirection ? 1 : -1);
    }
  };

  const updateIndex = (offset, dir, cb) => {
    const state = fullState();
    let index = state.index;
    let diff = offset[dir] - state.offset[dir];
    const step = dir === 'x' ? state.width : state.height;

    if (props.loop) {
      if (Math.abs(diff) >= step / 2) {
        diff = diff < 0 ? step + diff : diff - step;
        index = diff > 0 ? index + 1 : index - 1;
      }

      index = Math.min(Math.max(0, index), state.total - 1);
    } else {
      index = Math.min(
        Math.max(0, index + (diff < 0 ? diff > -step / 2 ? 0 : 1 : diff < step / 2 ? 0 : -1)),
        state.total - 1
      );
    }

    const newState = { index };

    const callback = () => {
      setState(newState);
      cb && cb();
    };

    if (!state.loop) {
      if (index === 0 || index === state.total - 1) {
        newState.autoplayEnd = true;
        autoplayTimer.current && clearTimeout(autoplayTimer.current);
      }
    }

    setState(newState, callback);
  };

  const scrollBy = (index, animated = true) => {
    if (state.isScrolling || state.total < 2) return;

    const state = fullState();

    let diff = (props.loop ? 1 : 0) + index + state.index;
    const x = state.dir === 'x' ? diff * state.width : 0;
    const y = state.dir === 'y' ? diff * state.height : 0;

    scrollView.current &&
      scrollView.current.scrollTo({ x, y, animated: animated });

    const newState = {};
    if (!animated) {
      newState.autoplayEnd = true;
    }

    newState.index = index + state.index;
    setState(newState);
  };

  const scrollTo = (index, animated = true) => {
    if (state.isScrolling || state.total < 2) return;
    const state = fullState();
    const diff = index - state.index;

    scrollBy(diff, animated);
  };

  const scrollViewPropOverrides = () => {
    const overrides = {};

    overrides.onTouchStart = (e) => {
      if (props.noTouch) return;

      props.onTouchStart && props.onTouchStart(e, fullState(), Swipe);
    };
    overrides.onMomentumScrollEnd = onScrollEnd;

    overrides.onResponderRelease = (e) => {
      if (props.noTouch) return;
      props.onResponderRelease && props.onResponderRelease(e, fullState(), Swipe);
    };

    return overrides;
  };

  // const renderPagination = () => {
  //   if (state.total <= 1) return null;

  //   return (
  //     <View style={stylePagination}>
  //       {renderPagination ? renderPagination(state.index, state.total, Swipe) : renderPagination()}
  //     </View>
  //   );
  // };

  const renderTitle = () => {
    const child = state.children[state.index];
    const title = child && child.props.title;

    return title ? (
      <View style={styleTitle}>
        {renderTitle ? renderTitle(title) : renderTitle()}
      </View>
    ) : null;
  };

  const renderNextButton = () => {
    if (!props.loop && state.index === state.total - 1) return null;

    return (
      <TouchableOpacity
        onPress={() => scrollBy(1)}
        style={styleButtonNext}
      >
        {renderNextButton ? renderNextButton(props.nextButton) : renderNextButton()}
      </TouchableOpacity>
    );
  };

  // const renderPrevButton = () => {
  //   if (!props.loop && state.index === 0) return null;

  //   return (
  //     <TouchableOpacity
  //       onPress={() => scrollBy(-1)}
  //       style={styleButtonPrev}
  //     >
  //       {renderPrevButton ? renderPrevButton(props.prevButton) : renderPrevButton()}
  //     </TouchableOpacity>
  //   );
  // };

  // const renderButtons = () => {
  //   return (
  //     <View pointerEvents="box-none" style={styleButtons}>
  //       {renderPrevButton()}
  //       {renderNextButton()}
  //     </View>
  //   );
  // };

  const refScrollView = (view) => {
    scrollView.current = view;
  };

  const onPageScrollStateChanged = (state) => {
    if (state === 'idle') {
      state.isScrolling = false;
    }

    props.onPageScrollStateChanged && props.onPageScrollStateChanged(state, fullState(), Swipe);
  };

  const renderScrollView = (pages) => {
    return (
      <ScrollView
        ref={refScrollView}
        {...props}
        {...scrollViewPropOverrides()}
        contentContainerStyle={[styles.wrapperIOS, props.style]}
        contentOffset={state.offset}
        onScrollBeginDrag={onScrollBegin}
        onMomentumScrollEnd={onScrollEnd}
        onResponderRelease={onScrollEndDrag}
        onScrollEndDrag={onScrollEndDrag}
        onScroll={props.onScroll}
        onPageScrollStateChanged={onPageScrollStateChanged}
      >
        {pages}
      </ScrollView>
    );
  };

  const containerStyle = {
    width: state.width,
    height: state.height,
  };

  const pages = state.children.map((page, i) => {
    const { ref, key } = page;
    return (
      <View style={containerStyle} key={key || i}>
        {page}
      </View>
    );
  });

  return (
    <View style={containerStyle} onLayout={onLayout}>
      {renderScrollView(pages)}
      {/* {props.showsPagination && renderPagination()} */}
      {renderTitle()}
      {/* {props.showsButtons && renderButtons()} */}
    </View>
  );
};

// Default props
Swipe.defaultProps = {
  horizontal: true,
  loop: true,
  autoplay: false,
  autoplayTimeout: 3,
  showsPagination: true,
  showsButtons: true,
  noTouch: false,
  noTitle: false,
  noPagination: false,
  noButtons: false,
};

export default Swipe;
