import { defineStore } from 'pinia'
import axios from 'axios'

const baseURL = import.meta.env.VITE_API_URL;

export const useSearchStore = defineStore('search', {
    state: () => ({
      keyword: '',
      selectedCategories: [],
      results: [],
      loading: false,
      error: null,
      categoryMapping: {
        'attraction-filter': 'spot',
        'culture-facility-filter': 'facility',
        'event-filter': 'festival',
        'tour-course-filter': 'leports',
        'residence-filter': 'stay',
        'shopping-filter': 'shopping',
        'restaurant-filter': 'restaurant'
      },
      markers: [],
      map: null,
    }),
  
    actions: {
      async searchPlaces() {
        this.loading = true
        try {
            const params = {
                keyword: this.keyword,
                spot: false,
                facility: false,
                festival: false,
                leports: false,
                stay: false,
                shopping: false,
                restaurant: false
            }

            if (this.selectedCategories.length > 0) {
                this.selectedCategories.forEach(category => {
                    const paramName = this.categoryMapping[category]
                    
                    if (paramName) {
                        params[paramName] = true
                    }
                })
            } else {
                params.spot = true
            }
            

            const response = await axios.get(`${baseURL}/attractions/search`, { 
                params,
                withCredentials: true
              })
            this.results = response.data.attractions
            await this.createMarkers(this.results)
        } catch (err) {
            this.error = err.message
        } finally {
            this.loading = false
        }
      },

      setKeyword(value) {
        this.keyword = value
      },
  
      setCategories(categories) {
        this.selectedCategories = categories
      },

      setMap(map) {
        this.map = map
      },

      async createMarkers(locations) {
        // 기존 마커들 제거
        this.markers.forEach(markerInfo => {
          markerInfo.marker.setMap(null)
          markerInfo.label.setMap(null)
        })
        this.markers = []
  
        // 새로운 마커 생성
        locations.forEach(location => {
          const markerPosition = new kakao.maps.LatLng(location.latitude, location.longitude)
          const marker = new kakao.maps.Marker({
            position: markerPosition,
            map: this.map
          })

          // 커스텀 오버레이 콘텐츠
          const content = document.createElement('div')
          content.className = 'marker-label'
          content.innerHTML = `
            <div style="
              padding: 5px;
              background: rgba(255, 255, 255, 0.9);
              border-radius: 4px;
              border: 1px solid #ccc;
              font-size: 12px;
              white-space: nowrap;
              text-align: center;
              margin-top: 5px;
            ">
              ${location.title || location.name}
            </div>
          `

          // 커스텀 오버레이 생성
          const label = new kakao.maps.CustomOverlay({
            position: markerPosition,
            content: content,
            yAnchor: -0.2,
            map: this.map
          })
  
          this.markers.push({
            marker: marker,
            label: label
          })

          if (this.markers.length > 0) {
            const bounds = new kakao.maps.LatLngBounds()
            this.markers.forEach(markerInfo => {
              bounds.extend(markerInfo.marker.getPosition())
            })
            this.map.setBounds(bounds)
          }
        })
      },
    }
  })