import Abi from './lib/abi'
/**
 * options：Object,默认Object，设置默认的request参数
 * proxt：Boolean，默认为true，是否将wx的所有api都封装成Promise
 */
export default function(ptions, proxy){
	return Abi(ptions,proxy)
}
