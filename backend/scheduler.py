from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from datetime import datetime
import pytz
from models import db, User, Streak

def reset_monthly_streaks():
    """Reset all user streaks at the beginning of each month"""
    with db.session() as session:
        # Get all users
        users = User.query.all()
        
        # Create historical streak records and reset current streaks
        current_month = datetime.now(pytz.UTC).month
        current_year = datetime.now(pytz.UTC).year
        
        for user in users:
            if user.current_streak > 0:
                # Save the streak history
                new_streak = Streak(
                    user_id=user.id,
                    streak_count=user.current_streak,
                    month=current_month,
                    year=current_year
                )
                session.add(new_streak)
            
            # Reset current streak
            user.current_streak = 0
            user.last_win_date = None
        
        session.commit()

def init_scheduler(app):
    """Initialize the scheduler with the monthly reset job"""
    scheduler = BackgroundScheduler(timezone=pytz.UTC)
    
    # Schedule the reset job to run at midnight UTC on the 1st of every month
    trigger = CronTrigger(
        day="1",
        hour="0",
        minute="0",
        timezone=pytz.UTC
    )
    
    scheduler.add_job(
        reset_monthly_streaks,
        trigger=trigger,
        id='monthly_reset',
        name='Monthly Streak Reset',
        replace_existing=True
    )
    
    scheduler.start()
    return scheduler 
