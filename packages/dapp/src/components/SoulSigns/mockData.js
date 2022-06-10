import Mock1 from '../../images/mocks/Mock1.png';
import Mock2 from '../../images/mocks/Mock2.png';
import Mock3 from '../../images/mocks/Mock3.png';
import Mock4 from '../../images/mocks/Mock4.png';
import Mock5 from '../../images/mocks/Mock5.png';
import MockSeal1 from '../../images/sealedNfts/10/1.png';
import MockSeal2 from '../../images/sealedNfts/10/2.png';
import MockSeal3 from '../../images/sealedNfts/1/3.png';
import MockSeal4 from '../../images/sealedNfts/1/4.png';
import MockSeal5 from '../../images/sealedNfts/0/5.png';

export const sealedNfts = [
    {
        id: 1,
        image: MockSeal1,
        ethAddress: '0x0',
    },
    {
        id: 2,
        image: MockSeal2,
        ethAddress: '0x0',
    },
    {
        id: 3,
        image: MockSeal3,
        ethAddress: '0x1',
    },
    {
        id: 4,
        image: MockSeal4,
        ethAddress: '0x0',
    },
    {
        id: 5,
        image: MockSeal5,
        ethAddress: '0x0',
    },
];

export const signNfts = [
    {
        id: 1,
        image: Mock1,
        ethAddress: '0x0',
    },
    {
        id: 2,
        image: Mock2,
        ethAddress: '0x1',
    },
    {
        id: 3,
        image: Mock3,
        ethAddress: '0x0',
    },
    {
        id: 4,
        image: Mock4,
        ethAddress: '0x0',
    },
    {
        id: 5,
        image: Mock5,
        ethAddress: '0x0',
    },
]

export const signedOn = [
  {
    id: 4,
    image: MockSeal4,
    ethAddress: '0x0',
  },
  {
    id: 3,
    image: Mock3,
    ethAddress: '0x0',
  },
]

export const userETHAddress = '0x1';