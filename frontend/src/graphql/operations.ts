import { gql } from "@apollo/client";

export const GET_ALL_ADS = gql`
  query GetAllAds {
  getAllAds {
    id
    title
    description
    owner
    price
    picture
    location
    createdAt
    categories {
      id
      nom
    }
    tags {
      id
      nom
    }
  }
}
`;

export const GET_ALL_CATEGORIES = gql`
  query GetAllCategories {
    getAllCategories {
      id
      nom
    }
  }
`;

export const GET_ALL_TAGS = gql`
  query GetAllTags {
    getAllTags {
      id
      nom
    }
  }
`;

export const GET_AD = gql`
  query getAdById($getAdByIdId: Float!) {
    getAdById(id: $getAdByIdId) {
      id
      title
      description
      owner
      price
      picture
      location
      createdAt
      categories {
        id
        nom
      }
      tags {
        id
        nom
      }
    }
  }
`;

export const DELETE_AD = gql`
  mutation DeleteAd($deleteAdId: Float!) {
    deleteAd(id: $deleteAdId)
  }
`;

export const CREATE_AD = gql`
  mutation CreateAd($data: AdInput!) {
    createAd(data: $data)
  }
`;