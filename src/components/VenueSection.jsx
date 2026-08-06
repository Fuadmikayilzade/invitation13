import React from 'react'
import './VenueSection.css'

const MAP_LINK = 'https://maps.app.goo.gl/8JizvWxGs5twMsQW8'
const WAZE_LINK = 'https://waze.com/ul?q=Nazim%20Quliyev%2027%2C%20Baku&navigate=yes'

export default function VenueSection({ venueImg, dark }) {
  const d = dark ? 'dark' : ''
  return (
    <section className="venue-wrap">
      <p className={`sec-label ${d}`}>Mərasim Yeri</p>
      <div className="venue-img-wrap">
        <img src={venueImg} alt="Nar & Şərab Restoranı" className={`venue-img ${dark ? 'dark' : ''}`} />
        <div className="venue-fade" />
      </div>
      <div className={`venue-info ${d}`}>
        <p className={`venue-name ${d}`}>Nar &amp; Şərab Restoranı</p>
        <p className={`venue-addr ${d}`}>✦ Nazim Quliyev küç. 27, Bakı</p>
        <div className="venue-btns">
          <a href={MAP_LINK} target="_blank" rel="noopener noreferrer"
            className={`vbtn primary ${d}`}>🗺 Xəritədə göstər</a>
          <a href={WAZE_LINK} target="_blank" rel="noopener noreferrer"
            className={`vbtn outline ${d}`}>🧭 Waze</a>
        </div>
      </div>
    </section>
  )
}