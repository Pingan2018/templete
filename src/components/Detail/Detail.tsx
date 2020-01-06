import React, { useEffect, useState, useRef } from 'react';
import { Input, Button } from 'antd';
import './detail.css'
const { Search } = Input
interface MyWindow extends Window {
  google: any
}
declare let window: MyWindow;
interface RefType{
  textSearch?:any
}
function Detail() {
  let initRef:RefType = {}
  let myRef = useRef(null)
  let mapRef = useRef(null)
  let googleRef = useRef(initRef)
  let [list, setList] = useState(['1'])
  // let [list, dispath] = useReducer((state: any, action: any) => {
  //   if (action.type === 'add') {
  //     return action.data
  //   }
  //   return state
  // }, ['1'])
  useEffect(() => {
    // setImmediate(() => {
      createMap()
      
    // })
  }, [])
  const createMap = () =>{
    let map = new window.google.maps.Map(document.getElementById('myMap'), {
      center: { lat: 1.359253, lng: 103.868396 },
      disableDefaultUI: true,
      zoom: 12,
    })
    let googleService = new window.google.maps.places.PlacesService(map)
    mapRef.current=map
    googleRef.current = googleService
  }
  const handleSearch = (value: string) => {
    let pyrmont = new window.google.maps.LatLng(1.359253, 103.868396);
    let request = {
      query: value,
      location: pyrmont,
      radius: '50000',
      fields: ['name', 'geometry'],
    };
    //调用谷歌地图api  results时接口返回值
    googleRef.current.textSearch(request, (results: any) => {
      // dispath({ type: 'add', data: results })
      //保存结果
      setList(results)
      myRef.current = results
      for (var i = 0; i < results.length; i++) {
        //创建图标
        createMarker(results[i]);
      }
    })
  }
  const callBack = () => {
    console.log(list, 'marker',myRef.current)
  }
  const createMarker = (place: any) => {
    let map = mapRef.current
    let marker = new window.google.maps.Marker({
      map,
      position: { lat: place.geometry.location.lat(), lng: place.geometry.location.lng() },
    })
    //给每个图标建立点击监听事件
    window.google.maps.event.addListener(marker, 'click', callBack)
  }
  const handleClick = () => {
    console.log(list, 'list')
  }
  return (
    <div>
      <Search
        placeholder="输入地标开始查找项目"
        onSearch={handleSearch}
        style={{ width: 300 }}
        id='inputRef'
        allowClear={true}
      />
      <Button type='primary' onClick={handleClick}>测试</Button>
      <div className='con'>
        <div className='left'>
          {
            list.map((item: any, index: number) => {
              return (
                <div key={index}>{item.name}</div>
              )
            })
          }
        </div>
        <div id='myMap'></div>
      </div>
    </div>
  );
}

export default Detail;
