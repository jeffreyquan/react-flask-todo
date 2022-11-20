osascript <<EOD
tell application "iTerm"
  tell current window
    -- create tab to run api
    # create tab with default profile

    tell current session
      split vertically with default profile
    end tell

    tell last session of current tab
      split horizontally with default profile
      split horizontally with default profile
    end tell

    tell first session of current tab
      write text "cd $1"
    end tell

    tell second session of current tab
      write text "echo 'postgres...'"
      write text "cd $1"
      write text "pwd"
      write text "docker logs --follow database"
    end tell

    tell third session of current tab
      write text "echo 'frontend...'"
      write text "cd frontend"
      write text "npm install; npm run start"
    end tell

    tell fourth session of current tab
      write text "echo 'backend...'"
      write text "cd backend"
      write text "pipenv install; bash ./bootstrap.sh"
    end tell
  end tell
end tell

EOD