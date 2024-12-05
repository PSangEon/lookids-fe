import { CommonResponse, responseList } from '../../types/responseType';
import { fetchDataforMembers } from '../common/common';

/*
  Favorite Service
*/

// 좋아요 여부 조회
// /read/favorite/feed
export async function getIsFavorite(targetCode: string): Promise<boolean> {
  try {
    const data = await fetchDataforMembers<CommonResponse<boolean>>(
      `/favorite-service/read/favorite/feed?targetCode=${targetCode}`,
      'GET',
      '',
      'no-cache'
    );
    return data.result;
  } catch (error) {
    console.error('좋아요 조회 중 오류 발생:', error);
    throw new Error(`좋아요 조회 중 실패: ${error}`);
  }
}

// 좋아요 토글 형식
// /write/favorite
export async function putFavoriteComment(
  authorUuid: string,
  targetCode: string,
  favoriteType: string
): Promise<void> {
  try {
    const data = await fetchDataforMembers<CommonResponse<void>>(
      `/favorite-service/write/favorite`,
      'PUT',
      {
        authorUuid,
        targetCode,
        favoriteType,
      },
      'no-cache'
    );
    console.log(' 좋아요 등록 결과', data);
  } catch (error) {
    console.error('좋아요 등록 중 오류 발생:', error);
    throw new Error(`좋아요 등록 중 실패: ${error}`);
  }
}

export interface FavoriteList {
  uuid: string;
  targetCode: string;
  favoriteState: boolean;
  favoriteType: string;
}

export async function getFeedFavoriteList(
  targetCode: string,
  favoriteType: string,
  page: number
): Promise<responseList<FavoriteList>> {
  try {
    const data = await fetchDataforMembers<
      CommonResponse<responseList<FavoriteList>>
    >(
      `favorite-service/read/favorite/feed-favoirte-list?targetCode=${targetCode}&favoriteType=${favoriteType}&page=${page}&size=20`,
      'GET',
      '',
      'default',
      'updateFeedFavoriteList'
    );
    return data.result;
  } catch (error) {
    console.error('좋아요 리스트 조회 중 오류 발생:', error);
    throw new Error(`좋아요 리스트 조회 중 실패: ${error}`);
  }
}