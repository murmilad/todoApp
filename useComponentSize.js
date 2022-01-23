import React, {useState, useCallback} from 'react'


const useComponentSize = () => {
    const [size, setSize] = useState({width:1, height:1});
  
    const onLayout = useCallback(event => {
      const { width, height } = event.nativeEvent.layout;
      setSize({ width, height });
    }, []);
  
    return [size, onLayout];
};

export default useComponentSize;
