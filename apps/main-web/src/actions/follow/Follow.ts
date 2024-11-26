import { Following } from '../../types/follow/FollowType';
import { CommonResponse, responseList } from '../../types/responseType';
import { fetchDataforMembers } from '../common/common';

export async function getFollowingList(): Promise<responseList<Following>> {
  try {
    const data = await fetchDataforMembers<
      CommonResponse<responseList<Following>>
    >(`member-service/read/following`, 'GET', null, 'no-cache');
    console.log('팔로잉 목록:', await data.result);
    return await data.result;
  } catch (error) {
    console.error('팔로잉 목록 조회 중 오류 발생:', error);
    throw new Error(`팔로잉 목록 조회 실패: ${error}`);
  }
}