import { useState } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button, Col } from 'react-bootstrap'
import { create as ipfsHttpClient } from 'ipfs-http-client'
import './App.css';

const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const Create = ({ marketplace, nft }) => {
  const [image, setImage] = useState('')
  const [price, setPrice] = useState(1)
  const [name, setName] = useState('')
  const [sno, setSno] = useState('')
  const [warranty,setWarranty] = useState(0)
  const [description, setDescription] = useState('')
  const uploadToIPFS = async (event) => {
    event.preventDefault()
    const file = event.target.files[0]
    if (typeof file !== 'undefined') {
      try {
        const result = await client.add(file)
        console.log(result)
        setImage(`https://ipfs.infura.io/ipfs/${result.path}`)
      } catch (error){
        console.log("ipfs image upload error: ", error)
      }
    }
  }
  const createNFT = async () => {
    if (!image || !name || !description || !warranty || !sno) return
    try{
      setPrice(1)
      const date = Math.floor(new Date().getTime() / 1000);
      const result = await client.add(JSON.stringify({image, price, name, description, warranty, sno, date}))
      mintThenList(result)
    } catch(error) {
      console.log("ipfs uri upload error: ", error)
    }
  }
  const mintThenList = async (result) => {
    const uri = `https://ipfs.infura.io/ipfs/${result.path}`
    // mint nft 
    await(await nft.mint(uri)).wait()
    // get tokenId of new nft 
    const id = await nft.tokenCount()
    // approve marketplace to spend nft
    await(await nft.setApprovalForAll(marketplace.address, true)).wait()
    // add nft to marketplace
    // const listingPrice = web3.utils.toWei(price.toString())
    await(await marketplace.makeItem(nft.address, id, price, sno, warranty)).wait()
  }
  return (
    <div className="container-fluid navgap pt-5">
      <div className="row">
        <main role="main" className="col-lg-12 mx-auto" style={{ maxWidth: '1000px' }}>
          <div className="content mx-auto">
            <Row className="g-4 justify-content-center">
              <Form.Control
                type="file"
                required
                name="file"
                onChange={uploadToIPFS}
              />
              <Form.Control onChange={(e) => setName(e.target.value)} size="sm-md lg" required type="text" placeholder="Name" />
              <Form.Control onChange={(e) => setDescription(e.target.value)} size="md" required as="textarea" placeholder="Description" />
              {/* <Form.Control onChange={(e) => setPrice(e.target.value)} size="lg" required type="number" placeholder="Price in ETH" /> */}
              <Form.Control onChange={(e) => setSno(e.target.value)} size="lg" required type="text" placeholder="Enter Serial Number" />
              <Form.Control onChange={(e) => setWarranty(e.target.value)} size="lg" required type="number" placeholder="Enter Warranty period (in yrs)" />
              <div className="d-grid px-0">
                <Button onClick={createNFT} className="btn-col" variant='danger' size="lg">
                  Create & List NFT!
                </Button>
              </div>
            </Row>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Create