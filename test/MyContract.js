const {
  time,
  loadFixture,
} = require('@nomicfoundation/hardhat-network-helpers')
const { anyValue } = require('@nomicfoundation/hardhat-chai-matchers/withArgs')
const { expect } = require('chai')
const { ethers } = require('hardhat')

describe('GasOptimizer', function () {
  async function deployContractFixture() {
    const [owner, otherAccount] = await ethers.getSigners()
    const JOIN_FEE = ethers.utils.parseEther('0.02')

    const MyContract = await ethers.getContractFactory('MyContract')
    const myContract = await MyContract.deploy(owner.address, JOIN_FEE)

    return { myContract, owner, otherAccount, JOIN_FEE }
  }

  describe('Deployment', function () {
    it('Should set the join fee amount', async function () {
      const { myContract, JOIN_FEE, owner } = await loadFixture(
        deployContractFixture
      )
      expect(await myContract.getJoinFee()).to.equal(JOIN_FEE)
    })

    it('Should set the admin address', async function () {
      const { myContract, JOIN_FEE, owner } = await loadFixture(
        deployContractFixture
      )
      const setOwner = await myContract.getOwner()
      expect(setOwner.toString()).to.equal(owner.address)
    })
  })

  describe('Join', function () {
    it('Should add the a new member', async function () {
      const { JOIN_FEE, otherAccount, myContract, owner } = await loadFixture(
        deployContractFixture
      )

      await myContract.join({ value: JOIN_FEE })

      const balance = await myContract.getBalances()

      console.log('Balance: ', balance.toString())
      console.log('JOIN FEE: ', JOIN_FEE)

      expect(balance.toString()).to.be.equal(JOIN_FEE)
    })
  })
})
