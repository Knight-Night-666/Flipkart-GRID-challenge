import { useState, useEffect } from 'react'
import { ethers } from "ethers"
import { Row, Col, Card, Button } from 'react-bootstrap'
import {
  Link, useLocation
} from "react-router-dom";
import './App.css';

const Home = ({ marketplace, nft }) => {
  const location = useLocation();
  const [loading, setLoading] = useState(true)
  const [items, setItems] = useState([])
  const [Buyadd, setBuyadd] = useState('')
  const [emailadd, setEmail] = useState('')
  const loadMarketplaceItems = async () => {
    // Load all unsold items
    const itemCount = await marketplace.itemCount()
    let items = []
    for (let i = 1; i <= itemCount; i++) {
      const item = await marketplace.items(i)
      if (!item.sold) {
        // get uri url from nft contract
        const uri = await nft.tokenURI(item.tokenId)
        // use uri to fetch the nft metadata stored on ipfs 
        const response = await fetch(uri)
        const metadata = await response.json()
        // get total price of item (item price + fee)
        const totalPrice = await marketplace.getTotalPrice(item.itemId)
        // Add item to items array
        items.push({
          totalPrice,
          itemId: item.itemId,
          seller: item.seller,
          name: metadata.name,
          description: metadata.description,
          image: metadata.image,
          sno: metadata.sno,
          warranty: metadata.warranty,
          genesis : metadata.date,
          tokenId : i.tokenId
        })
      }
    }
    setLoading(false)
    setItems(items)
  }
  
  // var test={
  //   sendEmail(subject,to,body){
        
  //       /* SmtpJS.com - v3.0.0 */
  //       let Email = { send: function (a) { return new Promise(function (n, e) { a.nocache = Math.floor(1e6 * Math.random() + 1), a.Action = "Send"; var t = JSON.stringify(a); Email.ajaxPost("https://smtpjs.com/v3/smtpjs.aspx?", t, function (e) { n(e) }) }) }, ajaxPost: function (e, n, t) { var a = Email.createCORSRequest("POST", e); a.setRequestHeader("Content-type", "application/x-www-form-urlencoded"), a.onload = function () { var e = a.responseText; null != t && t(e) }, a.send(n) }, ajax: function (e, n) { var t = Email.createCORSRequest("GET", e); t.onload = function () { var e = t.responseText; null != n && n(e) }, t.send() }, createCORSRequest: function (e, n) { var t = new XMLHttpRequest; return "withCredentials" in t ? t.open(e, n, !0) : "undefined" != typeof XDomainRequest ? (t = new XDomainRequest).open(e, n) : t = null, t } };
    
  //       Email.send({
  //           SecureToken : process.env.SECURE_TOKEN, // write your secure token
  //           To : to, // to include multiple emails you need to mention an array
  //           From : process.env.EMAIL_HOST,
  //           Subject : subject,
  //           Body : body
  //       })
  //       .then(message=>{
  //           // alert(message);
  //       });
    
        
  //   }
  //   }

  const sendEmail = (item)=>
  {
    let subject = 'NFT recieved'
    let body =  item.name + " has been transferred to you. The date of genesis : " + item.genesis + " Warranty period : " + item.warranty
    window.open(`mailto:${emailadd}?subject=${subject}&body=${body}`, '_blank', 'location=yes,height=570,width=520,scrollbars=yes,status=yes')
  }

  const buyMarketItem = async (item, Buyadd) => {
    console.log("buyer", Buyadd)
    console.log(emailadd)
    await (await marketplace.purchaseItem(item.itemId, Buyadd, { value: item.totalPrice })).wait()
    sendEmail(item)
    loadMarketplaceItems()
  }

  useEffect(() => {
    loadMarketplaceItems()
  }, [])
  if (loading) return (
    <main style={{ padding: "1rem 0", color: 'floralwhite' }}>
      <h2 className='mt-5 pt-4'>Loading...</h2>
    </main>
  )

  return (
  
    <div className="flex navgap justify-center">
      {/* <img class="img" src="abstract.png"/> */}
      {items.length > 0 ?
        <div className="px-5 container">
          <Row xs={1} md={2} lg={4} className="g-4 py-5">
            {items.map((item, idx) => (
              <Col key={idx} className="overflow-hidden">
                <Card className="gol">
                  <Card.Img variant="top" src={item.image} className="Card-Size" />
                  <Card.Body color="secondary">
                  </Card.Body>
                  <Card.Footer>
                    <div className='row'>
                      <div className="col">
                      <Card.Title>{item.name}</Card.Title>
                      </div>
                      <div className="col-12">
                      <Card.Text>
                      {item.description}
                    </Card.Text>
                    </div>
                    <input className='col-11 mt-3 form-control' onChange={(e) => setBuyadd(e.target.value)} type="text" placeholder="Enter the address of the buyer" id="buyadd" name="buyadd"/>
                    <input className='col-11 mt-3 form-control' onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter the Email of the buyer" id="emailadd" name="emailadd"/>

                    <Button className='col-12 mt-2 btn-col' onClick={() => buyMarketItem(item,Buyadd)} variant="danger" size="lg">
                      Transfer NFT
                    </Button>
                    </div>
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
        : (
          <main style={{ padding: "1rem 0", color: 'floralwhite' }}>
            <h2>No listed assets</h2>
          </main>
        )}
    </div>
  );
}
export default Home