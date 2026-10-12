/* ==========================================================================
   BHUKH LAGI — Streak Tests
   ========================================================================== */

describe('Streak', () => {
  test('initial streak is 0', () => {
    const streak = Store.getStreak();
    expect(streak.current).toBe(0);
    expect(streak.best).toBe(0);
  });

  test('updateStreak sets current to 1 on first order', () => {
    const streak = Store.updateStreak();
    expect(streak.current).toBe(1);
    expect(streak.best).toBe(1);
    expect(streak.lastOrderDate).toBe(TimeUtil.getTodayStr());
  });

  test('updateStreak does not increment for same day', () => {
    Store.updateStreak();
    const streak = Store.updateStreak();
    expect(streak.current).toBe(1);
  });

  test('streak marks today in week', () => {
    const streak = Store.updateStreak();
    const todayName = TimeUtil.getTodayName();
    expect(streak.week[todayName]).toBe(true);
  });

  test('BRAND.getStreakMessage returns appropriate message', () => {
    expect(BRAND.getStreakMessage(0)).toBe('Start your streak today!');
    expect(BRAND.getStreakMessage(3)).toBe('Keep it going! 🔥');
    expect(BRAND.getStreakMessage(7)).toBe('Perfect week! Legend. 🏆');
    expect(BRAND.getStreakMessage(10)).toBe('Perfect week! Legend. 🏆');
  });
});
