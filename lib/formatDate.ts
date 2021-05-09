import TimeAgo from 'javascript-time-ago';
import zhHant from 'javascript-time-ago/locale/zh-Hant';

TimeAgo.addLocale(zhHant);
const timeAgo = new TimeAgo('zh-Hant');

const formatDate = (date: string): string => {
  const d = new Date(date);
  d.setTime(d.getTime() + d.getTimezoneOffset() * 60 * 1000);

  const year = d.getFullYear();
  const month = d.getMonth() + 1;
  const day = d.getDate();

  const time = timeAgo.format(d);

  return `${year} 年 ${month} 月 ${day} 日（${time}）`;
};

export default formatDate;
