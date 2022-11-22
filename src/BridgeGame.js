const { generate } = require("./BridgeRandomNumberGenerator");
const { makeBridge } = require("./BridgeMaker.js");
const MissionUtils = require("@woowacourse/mission-utils");
const { Console } = MissionUtils;

/**
 * 다리 건너기 게임을 관리하는 클래스
 */
class BridgeGame {
  #bridgeShape
  #playerMovingRecord
  #attemptNumber

  constructor(size){
    this.#bridgeShape = makeBridge(size, generate);
    this.#playerMovingRecord = "";
    this.#attemptNumber = 1;
  }
  /**
   * 사용자가 칸을 이동할 때 사용하는 메서드
   * <p>
   * 이동을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  move(playerMoving) {
    if(this.#bridgeShape.length > this.playerLoction()){
      this.#playerMovingRecord = this.#playerMovingRecord + playerMoving;
    }
  }
  /**
   * 사용자가 게임을 다시 시도할 때 사용하는 메서드
   * <p>
   * 재시작을 위해 필요한 메서드의 반환 값(return value), 인자(parameter)는 자유롭게 추가하거나 변경할 수 있다.
   */
  retry() {
    this.#playerMovingRecord = "";
    this.#attemptNumber++;
  }

  isFinish() {
    if (this.#bridgeShape.length <= this.playerLoction())
      return true;
    
    return false;
  }

  isSuccess() {
    const bridgeFootboard = this.#bridgeShape[this.playerLoction() - 1];
    const playerMoving = this.#playerMovingRecord[this.#playerMovingRecord.length - 1];
    const isSuccess = (bridgeFootboard === playerMoving);

    return isSuccess;
  }

  playerLoction(){
    return this.#playerMovingRecord.length;
  }

  getPlayerMovingRecord(){
    return this.#playerMovingRecord;
  }

  getAttemptNumber(){
    return this.#attemptNumber;
  }
}

module.exports = BridgeGame;
