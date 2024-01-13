/**
 * 型
 */
enum MODE {
	Count,
	Watch,
}

/**
 * Global variable
 */
// 動作モード
let appMode: MODE = MODE.Count;
let timeCount: number = 0;
let isRunning: boolean = false;
let timerID: number = 0;
let timerID2: number = 0;
const msClass: string = 'stopwatch__ms';
const dayOfWeekClass: string = 'stopwatch__day-of-week';
const elmCount: HTMLElement = document.querySelector('#js-count')!;
const elmStart: HTMLElement = document.querySelector('#js-start')!;
const elmReset: HTMLElement = document.querySelector('#js-reset')!;
const elmDate: HTMLElement = document.querySelector("#js-date")!;

/**
 * Event handler
 */
// Page load
const onPageLoad = () => {
	elmDate.style.visibility = 'hidden';
	updateView();
};

// Start timer
const onStart = () => {
	if (appMode === MODE.Count) {
		isRunning === false ? startTimer(10) : stopTimer(timerID);
	}
};

// Reset timer
const onReset = () => {
	if (appMode === MODE.Count) {
		stopTimer(timerID);
		resetCount();
		updateView(timeCount);
	}
};

/**
 * 動作モード変更処理
 */
const onChangeMode = () => {
	// 動作モードを変更
	changeMode();
	// ストップウォッチモードの場合
	if (appMode === MODE.Count) {
	  // カウントをリセット
		resetCount();
		// 描画を更新
		updateView();
	// 時計モードの場合
	} else if (appMode === MODE.Watch) {
		// すぐにタイマーを開始
		startTimer(1000);
		// 描画を更新
		updateView();
	}
};

/**
 * Event listener
 */
// Page load
window.addEventListener('load', onPageLoad);

// Click start
elmStart.addEventListener('click', onStart);

// Click reset
elmReset.addEventListener('click', onReset);

// Dbclick
elmReset.addEventListener('dblclick', onChangeMode);

/**
 * Initialize App
 */
function updateView (timeCount: number = 0) {
	if (appMode === MODE.Count) {
		// limit 59:59:99
		if(timeCount > 60 * 60 * 1000 -1) {
			timeCount = 60 * 60 * 1000 -1;
		}
		// Elapsed time minutes
		const mm: string = Math.floor(timeCount / 1000 / 60).toString().padStart(2, '0');
		// Elapsed time seconds
		const ss: string = Math.floor(timeCount / 1000 % 60).toString().padStart(2, '0');
		// Elapsed time milliseconds
		const ms: string = (timeCount % 1000).toString().padStart(3, '0').slice(0, 2);
		// String to display
		const count: string = `${mm}:${ss}<span class="${msClass}">${ms}</span>`;
		// Update HTML
		elmCount.innerHTML = count;
	// 時計モード
	} else if(appMode === MODE.Watch) {
		// 日付オブジェクト
		const now: Date = new Date();
		// 現在の「年」を求める
		const year: string = now.getFullYear().toString();
		// 現在の「月」を求める
		const month: string = (now.getMonth() + 1).toString().padStart(2, '0');
		// 現在の「日」を求める
		const date: string = now.getDate().toString().padStart(2, '0');
		// 曜日の配列
		const dayOfWeek: string[] = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
		// 現在の「曜日」を求める
		const day: string = dayOfWeek[now.getDay()];
		// 表示する文字列を編集
		const today: string = `${year}/${month}/${date}<span class="${dayOfWeekClass}">${day}</span>`;
		// 日付表示部を更新
		elmDate.innerHTML = today;
		// 現在の「時間」を求める
		const hh: string = now.getHours().toString().padStart(2, '0');
		// 現在の「分」を求める
		const mm: string = now.getMinutes().toString().padStart(2, '0');
		// 現在の「秒」を求める
		const ss: string = now.getSeconds().toString().padStart(2, '0');
		// 表示する文字列を編集
		const time: string = `${hh}:${mm}<span class="${msClass}">${ss}</span>`;
		// 時刻の表示を更新
		elmCount.innerHTML = time;
	}
}

/**
 * Start timer and change flag
 */
function startTimer(interval: number = 1000) {
	// ストップウォッチモードの場合
	if (appMode === MODE.Count) {
		// 指定された時間ごとにカウントを更新
		timerID = setInterval(() => {
		  // 経過時間を加算
			timeCount += interval;
		  // 描画を更新
			updateView(timeCount);
		}, interval);
		// 計測状態を「計測中」に変更
		isRunning = true;
	}
	// 時計モードの場合
	else if (appMode === MODE.Watch) {
		// 指定された時間ごとに描画を更新
		timerID2 = setInterval(() => {
		// 描画を更新
		updateView();
		}, interval);
	}
}

/**
 * Clear timer and change flag
 */
function stopTimer(timerID: number) {
	// ストップウォッチモードの場合
	if (appMode === MODE.Count) {
	  	// タイマーを停止
		clearInterval(timerID);
		// 計測状態を「停止中」に変更
		isRunning = false;
	}
	// 時計モードの場合
	else if (appMode === MODE.Watch) {
		// タイマーを停止
		clearInterval(timerID);
		// 計測状態を「停止中」に変更
		isRunning = false;
	}
}

/**
 * Reset count
 */
function resetCount() {
	// ストップウォッチモードの場合
	if (appMode === MODE.Count) {
		// 経過時間を初期化
		timeCount = 0;
	}
}

// 動作モード切り替え
function changeMode() {
	// ストップウォッチモードの場合
	if (appMode === MODE.Count) {
		// 時計モードに変更
		appMode = MODE.Watch;
		// 日付表示部を表示
		elmDate.style.visibility = "visible";
	}
	// 時計モードの場合
	else if (appMode === MODE.Watch) {
		// ストップウォッチモードに変更
		appMode = MODE.Count;
		// 日付表示部を非表示
		elmDate.style.visibility = "hidden";
	}
}
